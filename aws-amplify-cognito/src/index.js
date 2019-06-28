import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.min.css";
import "./index.css";
import App from "./App";

import Amplify from "aws-amplify";
import config1 from "./config1";

import * as serviceWorker from "./serviceWorker";
import { config } from "aws-sdk/global";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config1.cognito.REGION,
    userPoolId: config1.cognito.USER_POOL_ID,
    userPoolWebClientId: config1.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
