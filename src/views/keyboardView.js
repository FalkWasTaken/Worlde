import React from "react";
import '../styles.css'

const UPPER = "QWERTYUIOPÅ".split('')
const MIDDLE = "ASDFGHJKLÖÄ".split('')
const LOWER = "ZXCVBNM".split('')

function KeyboardView(props) {

    function renderChar(c) {
        return <button key={c} className={props.keyStatus[c]} onClick={() => props.addChar(c)}>{c}</button>
        //return <button key={c} className="keyLight">{c}</button>
    }

    return <div>
        <div>{UPPER.map(renderChar)}</div>
        <div>{MIDDLE.map(renderChar)}</div>
        <div>
            <button className="enter" onClick={() => props.validate()}>ENTER</button>
            {LOWER.map(renderChar)}
            <button className="keyLight" onClick={() => props.removeChar()}>←</button>
        </div>
    </div>
}

export default KeyboardView