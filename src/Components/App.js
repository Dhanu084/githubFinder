import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./Layouts/Navbar";
import Users from "./Users/Users";
import Search from "./Users/Search";
import Alert from "./Layouts/Alert";
import About from "./pages/About";
import User from "./Users/User";

const baseUrl = "https://api.github.com/";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUser = async (text) => {
    setLoading(true);
    const data = await axios.get(
      `${baseUrl}search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(data);
    setUsers(data.data.items);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  return (
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
                    searchUser={searchUser}
                    clearUser={users.length > 0 ? true : false}
                    clearUsers={clearUsers}
                    setAlert={setAlert}
                  />
                  <Users users={users} loading={loading} />
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
  );
};

export default App;
