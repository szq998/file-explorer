import React, {Component} from 'react'
import FileExplorer from "./FileExplorer";


class App extends Component {
    render() {
        return (
            <div >
                <FileExplorer />
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

function download(path) {
    const filename = path.split("/").slice(-1)[0]
    if (!filename.length) return

    const a = document.createElement("a")
    a.href = path + "?operation=download"
    a.download = filename
    a.click()
}

export { App as default, list, download };
