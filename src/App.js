import React from "react";
import "./App.css";
import Topbar from "./Components/Topbar";
import Main from "./Components/Main";
import { Route, Switch } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";

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
      </Switch>

      <Footer />
    </>
  );
};

export default App;
