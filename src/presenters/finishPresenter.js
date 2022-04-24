import React, {useState, useEffect} from "react"
import FinishedView from "../views/finsihedView"
import {updateStats, getGlobalStats} from "../firebaseUtils"

function FinishPresenter(props) {
    const game = props.game
    const [status, setStatus] = useState()
    const [stats, setStats] = useState()

    function statusObs(payload) {
        if (payload.newStatus) {
            const newStats = getGlobalStats()
            newStats.then(value => setStats(value))
            if (!status && game.haveWon) {
                setStatus("hasWon")
                updateStats(game.currentGuess + 1)
            } else if (!status && game.currentGuess == 5) {
                setStatus("hasLost")
                updateStats()
            }
        }
    }

    useEffect(() => game.addObserver(statusObs), [])

    return <FinishedView status={status} word={game.word} stats={stats} back={() => setStatus(null)}/>
}

export default FinishPresenter