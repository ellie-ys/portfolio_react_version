import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Portfolio from "./components/port";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>

        <Route exact path="/login">
          <LoginForm />
        </Route>

        <Route exact path="/register">
          <RegisterForm />
        </Route>

        <Route path="/elice">
          <Portfolio />
        </Route>

        <Route path="/network">
          <Portfolio />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
