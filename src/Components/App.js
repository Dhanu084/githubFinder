import React, { useState, useEffect, Fragment, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./Layouts/Navbar";
import Users from "./Users/Users";
import Search from "./Users/Search";
import Alert from "./Layouts/Alert";
import About from "./pages/About";
import User from "./Users/User";
import GithubContext from "../Context/github/GithubContext";
import GithubState from "../Context/github/GithubState";

const baseUrl = "https://api.github.com/";

const App = () => {
  const githubContext = useContext(GithubContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const clearUsers = () => {
    setUsers([]);
  };

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
                    <Search
                      clearUser={users.length > 0 ? true : false}
                      clearUsers={clearUsers}
                      setAlert={setAlert}
                    />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => <User {...props} baseUrl={baseUrl} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
