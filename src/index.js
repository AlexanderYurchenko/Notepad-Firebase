import React from 'react';
import ReactDOM from 'react-dom';
import store from "./js/store/index";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyAcVFZZW-fG2icMWszIlVdn_CRXadFeA2I",
  authDomain: "evernote-clone-a2661.firebaseapp.com",
  databaseURL: "https://evernote-clone-a2661.firebaseio.com",
  projectId: "evernote-clone-a2661",
  storageBucket: "evernote-clone-a2661.appspot.com",
  messagingSenderId: "873384903849",
  appId: "1:873384903849:web:688b85802c5722876e15b8",
  measurementId: "G-RPEV3B3QD0"
});

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
