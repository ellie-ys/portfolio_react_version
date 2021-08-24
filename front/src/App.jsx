import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import Main from "./page/main";
import PortfolioDetail from "./page/portfolioDetail";
import Network from "./page/network";
import Login from "./page/login";
import Register from "./page/register";

const api = axios.create({
  baseURL: `http://localhost:3000/`,
});

const Routes = () => {
  return (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact exact path="/mypage" component={PortfolioDetail} />
        <Route exact path="/elicer" component={Network} />
        <Route exact path="/elicer/:id" component={PortfolioDetail} />
        <Redirect to="/login" />
        {/* <Route component={PageNotFound} /> */}
      </Router>
  );
};


function App() {
  
  return 
}

export default App;
