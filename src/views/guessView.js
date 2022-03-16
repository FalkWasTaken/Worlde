import React from "react";
import "../styles.css"

function GuessView(props) {
    let id = 0;

    function renderGuess(guess) {
        return <div key={id}>{guess.split("").map(renderChar)}</div>
    }

    function renderChar(c) {
        id++;
        return <span key={id} className="guessGray">{c}</span>
    }

    return <div>
        {props.guesses.map(renderGuess)}
    </div>
}

export default GuessView