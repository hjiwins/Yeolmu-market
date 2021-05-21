import React from "react";
import { Route, Switch } from "react-router-dom";

import AllItems from "./pages/AllItems";
import Favorites from "./pages/Favorites";
import NewItem from "./pages/NewItem";
import Layout from "./components/layout/Layout";

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
      </Switch>
    </Layout>
  );
}

export default App;
