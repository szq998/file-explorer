import React from "react";

export function Location(props) {
    if (!props.location) return null

    const {location} = props
    const locParts = location.map((part, idx) => (
            <span key={`${part}-${idx}`}>
                <span> > </span>
                <span
                    onClick={props.goto.bind(null, location.slice(0, idx + 1))}
                    className="location-bar__location-part"
                >
                    {part}
                </span>
            </span>
        )
    )

    return (
        <div className="location-bar">
            <div className="location-bar__location">
                <span
                    onClick={props.goto.bind(null, [])}
                    className="location-bar__location-part"
                > / </span>
                {locParts}
            </div>
            <div className="location-bar__btn">
                <button onClick={props.refresh}>刷新</button>
            </div>
        </div>
    )
}