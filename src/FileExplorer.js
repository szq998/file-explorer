import FileNavigation from "./FileNavigation";
import FileView from "./FileView";
import React, {Component} from "react";

class FileExplorer extends Component {
    navSubscribers = []

    subscribeNavigation = (callback) => {
        this.navSubscribers.push(callback)
    }

    navigationChanged = (path) => {
        this.navSubscribers.forEach(sb => sb(path))
    }

    render() {
        const style = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "start",
        }
        return (
            <div style={style}>
                <FileNavigation notifyNavigation={this.navigationChanged} />
                <FileView subscribeNavigation={this.subscribeNavigation} />
            </div>
        );
    }
}


export default FileExplorer;