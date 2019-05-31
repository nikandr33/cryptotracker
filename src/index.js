import React from "react";
import ReactDOM from "react-dom";

import Rootrouter from "./route.js";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "./assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";



ReactDOM.render(
  <Rootrouter/>,
  document.getElementById("root")
);
