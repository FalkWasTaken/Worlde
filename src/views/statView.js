import React from "react"

import "../css/stats.css"

function StatView(props) {
    const stats = props.stats
    const tot = stats.reduce((prev, cur) => prev + cur)

    const scale = 100 / Math.max(...stats)

    function renderBar(val, i) {
        const width = val * scale + "%"
        return <div key={i} className="statRow">
            <span>{i+1}</span>
            <span className="barBorder">
                <span className="statBar" style={{width: width}}>{val != 0 ? val : ""}</span>
            </span>
        </div>
    }

    const numMatches = props.numLost + tot

    return <div className="statBox">
        <div>Du har spelat {numMatches} rund{numMatches == 1 ? "a" : "or"}.</div>
        <div className="statContent">
            {stats.map(renderBar)}
        </div>
        <button className="backButton" onClick={props.redirect}>Tillbaka</button>
    </div>
}

export default StatView