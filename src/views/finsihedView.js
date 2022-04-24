import React from "react"
import '../css/finish.css'

function FinishedView(props) {
    let box = null
    const stats = props.stats

    function printStats() {
        return stats && stats.avarageClear && stats.avarageTries ? <div style={{marginTop: "1em"}}>{Math.round(100*stats.avarageClear)}% av alla spelare hittade det korrekta ordet och av dem tog det i snitt {stats.avarageTries.toFixed(1)} försök.</div> : ""
    }

    switch (props.status) {
        case "hasWon":
            box = <div className="winBox">
                    <div>Grattis! Du hittade det korrekta ordet.</div>
                    {printStats()}
                </div>
            break
        case "hasLost":
            box = <div className="loseBox">
                    <div>Det korrekta ordet var <a href={"https://svenska.se/tre/?sok=" + props.word.toLowerCase() + "&pz=1"}>{props.word}</a>.</div>
                    {printStats()}
                </div>
            break
        default:
            return null
    }
    return <div className="blurContainer" onClick={props.back}>
        {box}
    </div>
}


export default FinishedView