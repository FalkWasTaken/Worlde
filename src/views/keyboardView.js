import React from "react";
import '../css/guesses.css'
import '../css/keyboard.css'

const UPPER = "QWERTYUIOPÅ".split('')
const MIDDLE = "ASDFGHJKLÖÄ".split('')
const LOWER = "ZXCVBNM".split('')

function KeyboardView(props) {

    function renderChar(c) {
        return <button key={c} className={props.keyStatus[c]} onClick={() => props.addChar(c)}>{c}</button>
    }

    return <div className="keyboard">
        <div className="keyRow">{UPPER.map(renderChar)}</div>
        <div className="keyRow">{MIDDLE.map(renderChar)}</div>
        <div className="keyRow">
            <button className="wideKey" onClick={() => props.validate()}>ENTER</button>
            {LOWER.map(renderChar)}
            <button className="wideKey" onClick={() => props.removeChar()}>←</button>
        </div>
    </div>
}

export default KeyboardView