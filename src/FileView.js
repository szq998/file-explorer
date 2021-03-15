import {list, download} from './App.js'
import React, {Component} from 'react'
import {Location} from "./Location";
import {FileList} from "./FileList";
import {ToolBar} from "./ToolBar";

class FileView extends Component {
    state = {
        location: [], //["root", "sub", "dir"],
        files: []
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
        const files = await list("/" + location.join("/"))
        this.setState({
            location: location,
            files
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
        this.gotoLocation([])
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
                    <Location location={location} goto={this.gotoLocation}/>
                    <ToolBar/>
                </div>
                <FileList files={files} openDir={this.openDir} download={this.download}/>
            </div>
        )
    }
}


export default FileView;
