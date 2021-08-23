import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import Main from "./Page/Main";
import PortfolioDetail from "./Page/PortfolioDetail";
import Network from "./Page/Network";
import Login from "./Page/Login";
import Register from "./Page/Register";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact render={(props) => <Main {...props} />} />
      <Route
        path="/register"
        exact
        render={(props) => <Register {...props} />}
      />
      <Route path="/login" exact render={(props) => <Login {...props} />} />
      <Route
        path="/mypage"
        exact
        render={(props) => <PortfolioDetail {...props} />}
      />
      <Route path="/elicer" exact render={(props) => <Network {...props} />} />
      <Route
        path="/elicer/:id"
        exact
        render={(props) => <PortfolioDetail {...props} />}
      />
      <Redirect to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
