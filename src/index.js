import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

let viewport = document.querySelector('meta[name="viewport"]');

if ( viewport ) {
  viewport.content = "initial-scale=1";
  viewport.content = "width=device-width";
}

ReactDOM.render(<App />, document.getElementById('root'));
