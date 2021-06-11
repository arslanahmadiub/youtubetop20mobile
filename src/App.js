import React from "react";
import "./App.css";
import Topbar from "./Components/Topbar";
import Main from "./Components/Main";
import { Route, Switch } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import Charity from "./Components/Charity";
import Privacy from "./Components/Privacy";
import SignIn from "./Components/SignIn";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";

const App = () => {
  return (
    <>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/about">
          <AboutUs />
        </Route>
        <Route exact path="/charity">
          <Charity />
        </Route>
        <Route exact path="/privacy">
          <Privacy />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgot">
          <ForgotPassword />
        </Route>
      </Switch>

      <Footer />
    </>
  );
};

export default App;
