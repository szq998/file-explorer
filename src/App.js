import React, {Component} from 'react'
import FileNavigation from "./FileNavigation";
import FileView from "./FileView";


class App extends Component {
    render() {
        const style = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "start",
        }
        return (
            <div style={style}>
                <FileNavigation />
                <FileView />
            </div>
        );
    }
}

async function list(path) {
    // const res = await fetch(path + "?operation=list")
    // const listed = await res.json()
    const listed = [
        {name: 'file1', size: 65536, timestamp: 123456, isDirectory:false},
        {name: 'file2.txt', size: 123456, timestamp: 723456, isDirectory:false},
        {name: 'file3', size: 656, timestamp: 823456, isDirectory:false},
        {name: 'file4', size: 123123456, timestamp: 923456, isDirectory:false},
        {name: 'dir1', size: 16, timestamp: 923456, isDirectory:true},
        {name: 'dir2', size: 2, timestamp: Date.now() - 100000, isDirectory:true},
    ]
    return listed
}

export { App as default, list };
