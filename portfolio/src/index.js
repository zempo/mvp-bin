import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
// Components
import App from "./App";
import "./styles/Reset.scss";
import StyleState from "./context/state/StyleState";
import WorksState from "./context/state/WorksState";
import BytesState from "./context/state/BytesState";

ReactDOM.render(
  <React.StrictMode>
    <StyleState>
      <WorksState>
        <BytesState>
        <Router>
          <App />
        </Router>
        </BytesState>
      </WorksState>
    </StyleState>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
