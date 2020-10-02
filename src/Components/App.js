import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Layouts/Navbar";
import Users from "./Users/Users";
import Search from "./Users/Search";
import Alert from "./Layouts/Alert";
import About from "./pages/About";
import User from "./Users/User";
import GithubState from "../Context/github/GithubState";
import NotFound from "./Layouts/NotFound";

const baseUrl = "https://api.github.com/";

const App = () => {
  const [alert, setAlert] = useState(null);

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="GitHub Finder" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search setAlert={setAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
