import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import firebase from "firebase/app";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAdOerf1oksz-wzx81gj_pCKZBmj7soW44",
  authDomain: "st-parkinglot.firebaseapp.com",
  databaseURL: "https://st-parkinglot.firebaseio.com",
  projectId: "st-parkinglot",
  storageBucket: "st-parkinglot.appspot.com",
  messagingSenderId: "649757360476",
  appId: "1:649757360476:web:814513abf4c891ce9e0199"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
