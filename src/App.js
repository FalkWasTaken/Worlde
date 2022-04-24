import React, { useState } from 'react'
import './css/App.css'
import './css/styles.css'
import HeaderPresenter from './presenters/headerPresenter'
import Keyboard from './presenters/keyboardPresenter'
import GuessPresenter from './presenters/guessPresenter'
import FinishPresenter from './presenters/finishPresenter'
import Game from './game'

function App(props) {
    const game = new Game()
    
    if (props.state) {
      game.sync(props.state)
    }

    /*
    document.addEventListener('keydown', e => {
      switch (e.code) {
          case "Enter":
              game.validate()
              return
          case "Backspace":
              game.removeChar()
              return
      }
      game.addChar(e.code.toUpperCase().replace("KEY", ""))
    })
    */

    return <div className="App">
        <HeaderPresenter game={game}/>
        <FinishPresenter game={game}/>
        <GuessPresenter game={game}/>
        <Keyboard game={game}/>
      </div>
    
}

export default App;
