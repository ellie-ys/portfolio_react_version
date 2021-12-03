import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  NavComponent,
  Main,
  Network,
  Login,
  Register,
} from "./portfolio/components";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavComponent />
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
