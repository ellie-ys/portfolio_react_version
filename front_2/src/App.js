import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import Header from "./components/header";
import Footer from "./components/footer";
import styled from "styled-components";
import Portfolio from "./components/elicePortfolio";

const MainPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  width: 296px;
  height: 407px;
`;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/elicer">
          <ElicePortfolio />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

function Login() {
  return (
    <>
      <Header />
      <MainPage>
        <div>
          <h2>Login Page</h2>
          <LoginForm />
        </div>
      </MainPage>
      <Footer />
    </>
  );
}

function Register() {
  return (
    <>
      <Header />
      <MainPage>
        <div>
          <h2>Register Page</h2>
          <RegisterForm />
        </div>
      </MainPage>
      <Footer />
    </>
  );
}
function ElicePortfolio() {
  return (
    <>
      <Header />
      <Portfolio />
      <Footer />
    </>
  );
}

export default App;
