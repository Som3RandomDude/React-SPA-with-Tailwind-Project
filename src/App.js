import * as React from "react";
import Header from "./components/header/Header.js";
import Home from "./components/home/Home.js";
import Footer from "./components/footer/Footer.js";
import Register from './components/register/Register.js';
import { Route, Switch } from 'react-router-dom';
import Login from "./components/login/Login.js";


function App() {
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

      </Switch>

      <Footer />
    </div>

  );
}

export default App;
