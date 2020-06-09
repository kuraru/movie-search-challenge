import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import Searcher from "./Searcher";
import About from "./About";

// Main screen
// Here is the main menu and the posible screens
// TODO: Fix Routing
export default function App() {
  return (
    <Router>
      <div className="App">
        <LeftMenu />
        <Switch>
          <Route path="/Searcher">
            <Searcher />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="*">
            <Searcher />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
