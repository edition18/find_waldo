import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// needed to install jquery and popper.js to get javascript bits of boostrap working

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
