import React from 'react'
import GuessView from '../views/guessView'

function GuessPresenter(props) {
    const game = props.game;
    const [guesses, setGuesses] = React.useState(() => game.guesses)

    function guessesObs(payload) {
        if (payload.newGuesses) {
            setGuesses(payload.newGuesses)
        }
    }

    function onCreate() {
        game.addObserver(guessesObs)
        return () => game.removeObserver(guessesObs)
    }

    React.useEffect(onCreate, [])

    return <GuessView guesses={guesses}/>
}

export default GuessPresenter