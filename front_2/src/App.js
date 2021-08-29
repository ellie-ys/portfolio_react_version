import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Portfolio from "./components/portfolio";
import Network from "./components/network";
import NotFoundPage from "./components/page404";

function App() {
  const [loginId, setLoginId] = useState(window.sessionStorage.getItem("id"));
  return (
    <Router>
      <Header loginId={loginId} setLoginId={setLoginId} />

      <Switch>
        <Route exact path="/login">
          <LoginForm setLoginId={setLoginId} />
        </Route>

        <Route exact path="/register">
          <RegisterForm />
        </Route>

        {/* api = network / elicer */}
        <Route path="/elicer">
          <Network loginId={loginId} setLoginId={setLoginId} />
        </Route>

        <Route exact path="/page404">
          <NotFoundPage loginId={loginId} />
        </Route>

        {/* api = user . portfolio */}
        <Route path="/:id">
          <Portfolio loginId={loginId} setLoginId={setLoginId} />
        </Route>

        <Route path="/">
          <Portfolio loginId={loginId} setLoginId={setLoginId} />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
