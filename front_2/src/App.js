import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navi, Main, Network, Login, Register } from "./portfolio/components";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
