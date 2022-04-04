import React from "react"
import '../css/finish.css'

function FinishedView(props) {
    let box = null
    switch (props.status) {
        case "hasWon":
            box = <div className="winBox">Congrats, you found the correct word!</div>
            break
        case "hasLost":
            box = <div className="loseBox">Sorry, the correct word was <a href={"https://svenska.se/tre/?sok=" + props.word.toLowerCase() + "&pz=1"}>{props.word}</a>.</div>
            break
        default:
            return null
    }
    return <div className="blurContainer">
        {box}
    </div>
}


export default FinishedView