import React from "react";

export function Location(props) {
    const style = {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "center",

        width: "50%",

        border: "1px solid gray"
    }

    const {location} = props
    const locParts = location.map((part, idx) => (
            <span key={`${part}-${idx}`}>
                <span> > </span>
                <span onClick={props.goto.bind(null, location.slice(0, idx + 1))}>
                    {part}
                </span>
            </span>
        )
    )

    return (
        <div style={style}>
            <div>
                <span onClick={props.goto.bind(null, [])}> / </span>
                {locParts}
            </div>
            <div>
                <button onClick={props.refresh}>刷新</button>
            </div>
        </div>
    )
}