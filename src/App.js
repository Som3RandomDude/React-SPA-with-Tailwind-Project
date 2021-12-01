import * as React from "react";
import Header from "./components/header/Header.js";
import Home from "./components/home/Home.js";
import Footer from "./components/footer/Footer.js";
import Register from './components/register/Register.js';
import { Route, Switch } from 'react-router-dom';
import Login from "./components/login/Login.js";
import Create from "./components/create/Create.js";
import Profile from "./components/profile/Profile.js";
import Post from "./components/post/Post.js";


function App() {
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={Create} />
        <Route path="/profile" component={Profile} />
        <Route path="/post/:postId" component={Post} />

      </Switch>

      <Footer />
    </div>

  );
}

export default App;
