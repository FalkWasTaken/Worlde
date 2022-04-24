import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { generateCookie } from './utils';
import {syncGame} from './firebaseUtils';
import fbConfig from './firebaseConfig'
import firebase from 'firebase/app'
require("babel-polyfill")

if (!document.cookie) {
  document.cookie = generateCookie()
}

firebase.initializeApp(fbConfig)

syncGame().then(state => 
  ReactDOM.render(<App state={state}/>, document.getElementById('root'))
)


