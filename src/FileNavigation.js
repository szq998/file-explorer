import {deepClone} from "./utilities.js";
import {list} from './App.js'
import React, {Component} from 'react'


function _FoldableDirList(dirs, key = null) {
    const folderIcon = <span className="file-navigation__folder-icon"> <i className="icon-basic-folder"> </i> </span>

    const dirList = []
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i]
        let listItem
        if (typeof dir === "string") {  // folded
            const dirName = dir
            listItem = (
                <li key={dirName}
                    data-dir-idx={i}
                >
                    {"▸"}
                    {folderIcon}
                    {dirName}
                </li>
            )
        } else {  // unfolded
            const {dirName, subDirs} = dir
            listItem = (
                <li key={dirName}
                    data-dir-idx={i}
                >
                    {"▾"}
                    {folderIcon}
                    {dirName}
                    {subDirs.length ?
                        _FoldableDirList(subDirs, "subDirsOf" + dirName)
                        : <div className="file-navigation__no-dir">无子目录</div>}
                </li>
            )
        }

        dirList.push(listItem)
    }
    return <ol key={key}>{dirList}</ol>
}

class FoldableDirList extends Component {
    getPathIndex(elem) {
        const path = []
        for (let curr = elem; curr.tagName === "LI"; curr = curr.parentNode.parentNode) {
            path.unshift(+curr.dataset.dirIdx)
        }
        return path
    }

    handleClick = ({target}) => {
        if (target.tagName !== "LI") return

        const path = this.getPathIndex(target)
        this.props.unfold(path)
    }

    handleDoubleClick = ({target}) => {
        if (target.tagName !== "LI") return

        const path = this.getPathIndex(target)
        this.props.onDoubleClickWithPath(path)
    }

    handleMouseOver = ({target}) => {
        if (target.tagName !== "LI") return

        target.classList.add("file-navigation-li-hovered")
    }

    handleMouseOut = ({target}) => {
        if (target.tagName !== "LI") return

        target.classList.remove("file-navigation-li-hovered")
    }

    render() {
        const {directories} = this.props
        return (
            <div className="file-navigation__dir-list"
                 onClick={this.handleClick}
                 onDoubleClick={this.handleDoubleClick}
                 onMouseOver={this.handleMouseOver}
                 onMouseOut={this.handleMouseOut}
            >
                {_FoldableDirList(directories)}
            </div>
        )
    }
}

class FileNavigation extends Component {
    // directories = [
    //     "dir1", "dir2",
    //     {
    //         dirName: "dir3",
    //         subDirs: [
    //             "sub1-in-dir3", "sub2-in-dir3",
    //             {
    //                 dirName: "sub3-in-dir3",
    //                 subDirs: ["sub-sub1", "sub-sub2"]
    //             },
    //             "sub4-in-dir3", "sub5-in-dir3",
    //             {
    //                 dirName: "sub6-in-dir3",
    //                 subDirs: ["sub-sub3"]
    //             },
    //         ]
    //     },
    //     "dir4", "dir5", "dir6"
    // ]
    state = {
        directories: [] // this.directories
    }

    async queryDirectories(pathIdx) {
        let {directories} = this.state
        const path = []
        for (const idx of pathIdx) {
            path.push(directories[idx].dirName ?? directories[idx])
            directories = directories[idx].subDirs
        }

        let fileInfoList = await list("/" + path.join("/"))
        fileInfoList = fileInfoList.filter(fileInfo => fileInfo.isDirectory)
        const dirNames = fileInfoList.map(fileInfo => fileInfo.name)
        return dirNames
    }

    unfold = (pathIdx) => {
        const {directories} = this.state
        const newState = deepClone(directories)

        let clickedIdx = pathIdx[pathIdx.length - 1]
        let containerOfClicked = newState
        for (const idx of pathIdx.slice(0, -1)) {
            containerOfClicked = containerOfClicked[idx].subDirs
        }

        const clicked = containerOfClicked[clickedIdx]
        if (typeof clicked !== "string") { // currently unfolded, need fold
            const dirName = clicked.dirName
            containerOfClicked[clickedIdx] = dirName
            this.setState({directories: newState})
        } else {  // currently folded, need unfold
            const dirName = clicked
            this.queryDirectories(pathIdx).then(subDirs => {
                containerOfClicked[clickedIdx] = {
                    dirName,
                    subDirs
                }
                // setTimeout(()=>this.setState({directories: newState}), 2000)
                this.setState({directories: newState})
            })
        }
    }

    handleDoubleClickWithPath = (pathIdx) => {
        const path = []
        let {directories: currDir} = this.state

        for (const idx of pathIdx.slice(0, -1)) {
            path.push(currDir[idx].dirName)
            currDir = currDir[idx].subDirs
        }
        const lastIdx = pathIdx[pathIdx.length - 1]
        const last = typeof currDir[lastIdx] === "string" ? currDir[lastIdx] : currDir[lastIdx].dirName
        path.push(last)

        this.props.notifyNavigation(path)
    }

    async componentDidMount() {
        let fileInfoList = await list("/")
        fileInfoList = fileInfoList.filter(fileInfo => fileInfo.isDirectory)
        const dirNames = fileInfoList.map(fileInfo => fileInfo.name)
        this.setState({directories: dirNames})
    }

    render() {
        const {directories} = this.state
        return (
            <div className="file-navigation">
                <FoldableDirList
                    unfold={this.unfold}
                    onDoubleClickWithPath={this.handleDoubleClickWithPath}
                    directories={directories}
                />
            </div>
        )
    }
}


export default FileNavigation;
