import {formatFileSize, formatTimestamp} from "./utilities";
import React from "react";

function FileListItem(props) {
    const folderIcon = <div className="file-item__folder-icon"><i className="icon-basic-folder"> </i></div>
    const docIcon = <span className="file-item__doc-icon"> <i className="icon-basic-sheet"> </i> </span>

    const {name, size, timestamp, isDirectory} = props.file
    const formattedSize = isDirectory ? size + "项" : formatFileSize(size)
    const formattedTime = formatTimestamp(timestamp)
    return (
        <div className="file-item"
            onClick={props.openOrDownload.bind(null, name)}>
            <div>
                <div className="file-item__icon">{ isDirectory ? folderIcon : docIcon}</div>
                <div className="file-item__name">{name}</div>
                <div className="file-item__size">{formattedSize}</div>
            </div>
            <div>
                <span className="file-item__time">{formattedTime}</span>
                {isDirectory ? <span className="file-item__dir-arrow"> > </span> : null}
            </div>
        </div>
    )
}

export function FileList(props) {
    const {files} = props
    if (!files) return null

    const items = files.map((file) => (
            <FileListItem
                key={file.name}
                file={file}
                openOrDownload={file.isDirectory ? props.openDir : props.download}
            />
        )
    )
    return (
        <div className="file-list">
            {items}
        </div>
    )
}