import React from "react";
import Routes from "./Routes";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
    );
}

export default App;
