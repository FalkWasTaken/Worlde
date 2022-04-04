import React, {useState, useEffect} from "react"
import FinishedView from "../views/finsihedView"

function FinishPresenter(props) {
    const game = props.game
    const [status, setStatus] = useState()

    function statusObs(payload) {
        if (payload.newStatus) {
            if (game.haveWon) {
                setStatus("hasWon")
            } else if (game.currentGuess == 5) {
                setStatus("hasLost")
            }
        }
    }

    useEffect(() => game.addObserver(statusObs), [])

    return <FinishedView status={status} word={game.word}/>
}

export default FinishPresenter