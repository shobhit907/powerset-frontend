import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

//serviceWorker.unregister();
