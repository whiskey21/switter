import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// eslint-disable-next-line
import firebase from "firebase";
import "./styles.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
