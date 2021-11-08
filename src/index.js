import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/main.css";
import React from "react";
import ReactDOM from "react-dom";

import { AppWithRouter } from "./pages/App";

ReactDOM.render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
