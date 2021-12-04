import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navi, Main, Network, Login, Register } from "./portfolio/components";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navi />
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/network">
          <Network />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
