import React from 'react'
import KeyboardView from '../views/keyboardView'

function Keyboard(props) {
    const game = props.game
    const [keyStatus, setStatus] = React.useState(() => game.charStatus)

    function keyStatObs(payload) {
        if (payload.newStatus) {
            setStatus({...payload.newStatus})
        }
    }

    function onCreate() {
        game.addObserver(keyStatObs)
        return () => game.removeObserver(keyStatObs)
    }

    React.useEffect(onCreate, [])

    return <KeyboardView addChar={c => game.addChar(c)} removeChar={() => game.removeChar()} validate={() => game.validate()} keyStatus={keyStatus}/>
}

export default Keyboard