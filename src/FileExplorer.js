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
        return (
            <div>
                <FileNavigation notifyNavigation={this.navigationChanged} />
                <FileView subscribeNavigation={this.subscribeNavigation} />
            </div>
        );
    }
}


export default FileExplorer;