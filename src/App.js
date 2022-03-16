import React, { Component } from 'react';
import './App.css';
import HeaderView from './views/headerView';
import KeyboardView from './views/keyboardView';
import GuessView from './views/guessView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderView/>
        <GuessView guesses={["TTTTT", "TTTTT", "TTTTT", "TTTTT", "TTTTT", "TTTTT"]}/>
        <KeyboardView/>
      </div>
    );
  }
}

export default App;
