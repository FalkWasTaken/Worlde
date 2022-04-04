import React, {useState, useEffect} from 'react'
import GuessView from '../views/guessView'

function GuessPresenter(props) {
    const game = props.game;
    const [guesses, setGuesses] = useState(() => game.guesses)
    const [status, setStatus] = useState(() => game.guessStatus)
    const [error, setError] = useState()

    const observers = [
        function guessesObs(payload) {
            const newGuesses = payload.newGuesses
            if (newGuesses) {
                setGuesses([...newGuesses])
                setError(undefined)
            }
        },

        function statusObs(payload) {
            if (payload.newGuessStatus) {
                setStatus(payload.newGuessStatus.map(l => l.map(string => string.slice())))
            }
        },

        function errorObs(payload) {
            if (payload.error) {
                setError(payload.error)
            }
        }
    ]

    function onCreate() {
        game.addObservers(observers)
        return () => {game.removeObservers(observers)}
    }

    useEffect(onCreate, []) 

    return <div className="guessContainer">
        {error ? <span className="error">{error}</span> : ""}
        <GuessView currentRow={game.currentGuess} guesses={guesses} status={status} rowClass={error ? "errorRow" : "guessRow"}/>
    </div>
}

export default GuessPresenter