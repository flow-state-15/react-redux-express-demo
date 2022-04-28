import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBanner from "./components/NavBanner";
import SplashPage from "./components/SplashPage";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Footer from "./components/Footer";
import Gif from "./components/Gif";

import { thunkRestoreSession } from "./store/session";
import { get_all_posts } from "./store/posts";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(thunkRestoreSession());
      dispatch(get_all_posts());
      setLoaded(true);
    })();
    console.log('in useeffect, after iife')
  }, [dispatch]);

  console.log('in body of function')

  if (!loaded) {
    console.log('in !loaded, loaded:: ', loaded)
    return null;
  }

  return (
    <BrowserRouter>
      <Header />
      <NavBanner />
      <div className="App">
        <main className="App-main">
          <Switch>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/sign-up" exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path="/users" exact={true}>
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <User />
            </ProtectedRoute>
            <ProtectedRoute path="/" exact={true}>
              <SplashPage />
            </ProtectedRoute>
            <ProtectedRoute path="/gif-demo" exact={true}>
              <Gif />
            </ProtectedRoute>
            <ProtectedRoute path="/posts-demo" exact={true}>
              <Posts />
            </ProtectedRoute>
          </Switch>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
