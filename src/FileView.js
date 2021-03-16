import {list, download} from './App.js'
import React, {Component} from 'react'
import {Location} from "./Location";
import {FileList} from "./FileList";
import {ToolBar} from "./ToolBar";

class FileView extends Component {
    constructor(props) {
        super(props);
        this.props.subscribeNavigation(this.gotoLocation)
    }

    state = {
        location: null, //["root", "sub", "dir"],
        files: null
    }
    /* [
        {name: 'file1', size: 65536, timestamp: 123456, isDirectory: false},
        {name: 'file2.txt', size: 123456, timestamp: 723456, isDirectory: false},
        {name: 'file3', size: 656, timestamp: 823456, isDirectory: false},
        {name: 'file4', size: 123123456, timestamp: 923456, isDirectory: false},
        {name: 'dir1', size: 16, timestamp: 923456, isDirectory: true},
        {name: 'dir2', size: 2, timestamp: Date.now() - 100000, isDirectory: true},
    ]*/

    gotoLocation = async (location) => {
        const path = "/" + location.join("/")
        const files = await list(path)
        this.setState({
            location: location,
            files
        }, () => {
            window.history.replaceState(null, null, path)
        })
    }

    openDir = (dirName) => {
        const location = this.state.location.concat(dirName)
        this.gotoLocation(location)
    }

    download = (name) => {
        const downloadLink = "/" + this.state.location.concat(name).join("/")
        download(downloadLink)
    }

    componentDidMount() {
        // const currLoc = window.location.pathname.split("/").slice(1)
        // if (currLoc[0] === "") { currLoc.pop() }

        let currLoc
        const pathname = window.location.pathname
        if (pathname === "/") {
            currLoc = []
        } else {
            currLoc = pathname.split("/").filter(v => v !== "")
        }
        this.gotoLocation(currLoc)
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
                    <Location
                        location={location}
                        goto={this.gotoLocation}
                        refresh={this.gotoLocation.bind(null, location)}
                    />
                    <ToolBar location={location}/>
                </div>
                <FileList files={files} openDir={this.openDir} download={this.download}/>
            </div>
        )
    }
}


export default FileView;
