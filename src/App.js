import * as React from "react";

import Header from "./components/header/Header.js";
import Home from "./components/home/Home.js";
import Footer from "./components/footer/Footer.js";
import Register from './components/register/Register.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./components/login/Login.js";
import Create from "./components/create/Create.js";
import Profile from "./components/profile/Profile.js";
import Post from "./components/post/Post.js";
import NotFound from "./components/404/404.js";

import { useEffect, useState } from 'react';
import { AuthContext } from './contexts/authContext.js';
import { auth } from "./utils/firebase.js";
import UserPosts from "./components/post/UserPosts.js";
import Edit from "./components/edit/Edit.js";
import RouteGuard from "./components/HOC/RouteGuard.js";





function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, [])

  const authInfo = {
    isAuthenticated: Boolean(user),
    email: user?.email,
    id: user?.uid
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <RouteGuard path="/login" component={Login}   auth={!authInfo.isAuthenticated}/>
          <RouteGuard path="/register" component={Register} auth={!authInfo.isAuthenticated} />
          <Route path="/create" component={Create} />
          {/* <Route path={`/profile/:userId`} component={Profile} /> */}
          <RouteGuard path={`/posts/:userId`} component={UserPosts}  auth={authInfo.isAuthenticated} />

          <Route path="/post/:postId" component={Post} />
          <RouteGuard path="/edit/:postId" component={Edit} auth={authInfo.isAuthenticated} />
          <RouteGuard path={`/profile/:userId`} component={Profile} auth={authInfo.isAuthenticated} />
          <Route path="/logout" component={() => {
            auth.signOut();
            return <Redirect to="/" />
          }} />
          <Route component={NotFound} />

        </Switch>

        <Footer />
      </>

    </AuthContext.Provider>
  );
}

export default App;
