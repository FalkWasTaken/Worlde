import React, { Component } from 'react';
import './css/App.css';
import './css/styles.css'
import HeaderView from './views/headerView';
import Keyboard from './presenters/keyboardPresenter'
import GuessPresenter from './presenters/guessPresenter'
import FinishPresenter from './presenters/finishPresenter'
import Game from './game'

class App extends Component {
  render() {
    const game = new Game()

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
    

    return (
      <div className="App">
        <HeaderView/>
        <FinishPresenter game={game}/>
        <GuessPresenter game={game}/>
        <Keyboard game={game}/>
      </div>
    );
  }
}

export default App;
