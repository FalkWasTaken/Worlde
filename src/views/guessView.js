import React from "react";
import "../css/guesses.css"

function flipTile(c, type, id) {
    let flipType = "flip" + type.slice(5)
    return <span key={id} className="flipContainer">
        <div className={"flip" + id}>
            <button className="flipFront">{c}</button>
            <button className={flipType}>{c}</button>
        </div>
    </span>
}


function GuessView(props) {
    let rowNo = -1;

    function renderGuess(guess, guessNo) {
        rowNo++;

        let full = guess
        while (full.length < 5) {
            full += "#"
        }

        let charNo = 0;

        function renderChar(c, status) {
            charNo++;
            let type = status
            if (status === "guessEmpty" && c !== "#")
                type = "guessWhite"
            if (rowNo + 1 === props.currentRow && type !== "guessEmpty" && type !== "guessWhite") {
                return flipTile(c, type, charNo)
            }
            return <button key={charNo} className={type}>{c === "#" ? "" : c}</button>
        }

        return <div key={rowNo} className={rowNo === props.currentRow ? props.rowClass : "guessRow"}>{full.split("").map((c, i) => renderChar(c, props.status[guessNo][i]))}</div>
    }

    

    return <div>
        {props.guesses.map(renderGuess)}
    </div>
}

export default GuessView