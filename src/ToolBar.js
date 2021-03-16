import { upload } from "./App";
import React from "react";

export class ToolBar extends React.Component {
    handleUpload = (event) => {
        const files = event.target.files
        const path = "/" + this.props.location.join("/")
        upload(path, files)
    }

    handleUploadBtnClick = (event) => {
        event.currentTarget.firstChild.click()
    }

    render() {
        return (
            <div>
                <button
                    className="tool-btn__upload"
                    onClick={this.handleUploadBtnClick}
                    disabled={!this.props.location}
                >
                    {/* for easier styling */}
                    <input
                        type="file"
                        multiple={true}
                        onChange={this.handleUpload}
                        style={{display: "none"}}
                    />
                    <span>上传</span>
                </button>
                <button>图标</button>
                <button>排序</button>
                <button>选择</button>
            </div>
        )
    }
}