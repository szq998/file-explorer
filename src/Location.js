import React from "react";

export function Location(props) {
    if (!props.location) return null

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
        <div>
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