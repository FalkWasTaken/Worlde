import React from "react";
import '../styles.css'

const UPPER = "QWERTYUIOPÅ".split('')
const MIDDLE = "ASDFGHJKLÖÄ".split('')
const LOWER = "ZXCVBNM".split('')

function KeyboardView(props) {

    function renderChar(c) {
        //return <span class={props.keyColor[c]}>{c}</span>
        return <button key={c} className="keyLight">{c}</button>
    }

    return <div>
        <div>{UPPER.map(renderChar)}</div>
        <div>{MIDDLE.map(renderChar)}</div>
        <div>
            <button className="enter">ENTER</button>
            {LOWER.map(renderChar)}
            <button className="keyLight">←</button>
        </div>
    </div>
}

export default KeyboardView