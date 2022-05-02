import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import AllItems from "./pages/AllItems";
import Favorites from "./pages/Favorites";
import NewItem from "./pages/NewItem";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice"

function App() {
  const token = document.cookie.split("=")[1];
  const autologin = () => {
    // Sends a request to the API to verify the existent cookie with the token.
    // If the token is correct, dispatch the login reducer.
    fetch("http://localhost:3000/api/user/autologin", {
      method: "POST",
      body: JSON.stringify({ token: token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        if (result.errorMessage) {
          alert(`${result.errorMessage}`);
        } else {
          // Save the token in a cookie
          document.cookie = `token=${result.token}`;
          // Save login data in Redux
          dispatch(
            login({
              isLoggedIn: true,
              userId: result.userId,
              username: result.username,
              avatar: result.avatar,
              token: result.token,
            })
          );
        }
      });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    // Check if there is a cookie
    const token = document.cookie.split("=")[1];
    // if the cookie is not there don't do anything
    // If the cookie is present, execute the autologin function
    autologin()
  }, []);
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
