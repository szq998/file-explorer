import FileNavigation from "./FileNavigation";
import FileView from "./FileView";
import React, {Component} from "react";

class FileExplorer extends Component {
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


export default FileExplorer;