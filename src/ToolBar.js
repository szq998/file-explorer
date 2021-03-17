import {upload} from "./App";
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
            <div className="toolbar">
                <div className="toolbar__btn-area">
                    <button className="toolbar__btn"
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
                    <button className="toolbar__btn">图标</button>
                    <button className="toolbar__btn">排序</button>
                    <button className="toolbar__btn">选择</button>
                </div>
            </div>
        )
    }
}