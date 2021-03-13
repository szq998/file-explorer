import {formatFileSize, formatTimestamp} from "./utilities.js";
import {list} from './App.js'
import React, {Component} from 'react'

function Location(props) {
    const style = {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "center",

        maxWidth: "400px",

        border: "1px solid gray"
    }

    const {location} = props
    const locParts = location.map((part, idx) => {
        return (
            <span key={`${part}-${idx}`}>
                {idx === location.length - 1 ? part : part + " > "}
            </span>
        )
    })

    return (
        <div style={style}>
            <div>
                {locParts}
            </div>
            <div>
                <button>刷新</button>
            </div>
        </div>
    )
}

function ToolBar() {
    return (
        <div>
            <button>图标</button>
            <button>排序</button>
            <button>选择</button>
        </div>
    )
}

function FileListItem(props) {
    const itemStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        border: "1px solid gray"
    }

    const {name, size, timestamp, isDir} = props.file
    const formattedSize = isDir ? size + "项" : formatFileSize(size)
    const formattedTime = formatTimestamp(timestamp)
    return (
        <div style={itemStyle}>
            <div>
                <div>{name}</div>
                <div>{formattedSize}</div>
            </div>
            <div>
                <span>{formattedTime}</span>
                {isDir ? <span> > </span> : null}
            </div>
        </div>
    )
}

function FileList(props) {
    const {files} = props
    const items = files.map((file) => <FileListItem key={file.name} file={file}/>
    )
    return (
        <div>
            {items}
        </div>
    )
}

class FileView extends Component {
    state = {
        location: ["root", "sub", "dir"],
        files: [
            {name: 'file1', size: 65536, timestamp: 123456, isDirectory: false},
            {name: 'file2.txt', size: 123456, timestamp: 723456, isDirectory: false},
            {name: 'file3', size: 656, timestamp: 823456, isDirectory: false},
            {name: 'file4', size: 123123456, timestamp: 923456, isDirectory: false},
            {name: 'dir1', size: 16, timestamp: 923456, isDirectory: true},
            {name: 'dir2', size: 2, timestamp: Date.now() - 100000, isDirectory: true},
        ]
    }

    render() {
        const barStyle = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
        }

        const {location, files} = this.state
        return (
            <div style={{flexGrow: "1"}}>
                <div style={barStyle}>
                    <Location location={location}/>
                    <ToolBar/>
                </div>
                <FileList files={files}/>
            </div>
        )
    }
}


export default FileView;
