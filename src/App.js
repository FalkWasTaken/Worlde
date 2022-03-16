import React, { Component } from 'react';
import './App.css';
import HeaderView from './views/headerView';
import KeyboardView from './views/keyboardView';
import GuessView from './views/guessView';
import Keyboard from './presenters/keyboardPresenter'
import GuessPresenter from './presenters/guessPresenter'
import Game from './game'

class App extends Component {
  render() {
    const game = new Game()
    return (
      <div className="App">
        <HeaderView/>
        <GuessPresenter game={game}/>
        <Keyboard game={game}/>
      </div>
    );
  }
}

export default App;
