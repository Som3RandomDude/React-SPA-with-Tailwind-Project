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

import { useEffect, useState } from 'react';
import { AuthContext } from './components/contexts/authContext.js';
import { auth } from "./components/utils/firebase.js";


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, [])

  const authInfo = {
    isAuthenticated: Boolean(user),
    email: user?.email,
    id: user?.id
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <div >
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/create" component={Create} />
          <Route path="/profile" component={Profile} />
          <Route path="/post/:postId" component={Post} />
          <Route path="/logout" component={() => {
            auth.signOut();
            return <Redirect to="/" />
          }} />

        </Switch>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
