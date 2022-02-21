import React from "react";
import { Route, Switch } from "react-router-dom";

import AllItems from "./pages/AllItems";
import Favorites from "./pages/Favorites";
import NewItem from "./pages/NewItem";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllItems />
        </Route>
        <Route path="/new-item">
          <NewItem />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
