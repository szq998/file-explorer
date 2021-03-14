import {formatFileSize, formatTimestamp} from "./utilities";
import React from "react";

function FileListItem(props) {
    const itemStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        border: "1px solid gray"
    }

    const {name, size, timestamp, isDirectory} = props.file
    const formattedSize = isDirectory ? size + "项" : formatFileSize(size)
    const formattedTime = formatTimestamp(timestamp)
    return (
        <div style={itemStyle} onClick={props.openOrDownload.bind(null, name)}>
            <div>
                <div>{name}</div>
                <div>{formattedSize}</div>
            </div>
            <div>
                <span>{formattedTime}</span>
                {isDirectory ? <span> > </span> : null}
            </div>
        </div>
    )
}

export function FileList(props) {
    const {files} = props
    const items = files.map((file) => (
            <FileListItem
                key={file.name}
                file={file}
                openOrDownload={file.isDirectory ? props.openDir : props.download}
            />
        )
    )
    return (
        <div>
            {items}
        </div>
    )
}