import React from "react";
import "../styles.css"

function GuessView(props) {
    let id = 0;

    function renderGuess(guess) {
        let full = guess
        while (full.length < 5) {
            full += " "
        }
        return <div key={id}>{full.split("").map(renderChar)}</div>
    }

    function renderChar(c) {
        id++;
        let type = "guessEmpty";
        //if (c !== " ") {
        //    type = "guessGray";
        //}
        return <button key={id} className={type}>{c}</button>
    }

    return <div>
        {props.guesses.map(renderGuess)}
    </div>
}

export default GuessView