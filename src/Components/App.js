import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Layouts/Navbar";
import Users from "./Users/Users";
import { Search } from "./Users/Search";

const baseUrl = "https://api.github.com/";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(
      `${baseUrl}/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    axios.get(`${baseUrl}users`).then((data) => {
      console.log(data);
      setUsers(data.data);
      setLoading(false);
    });

    return () => {};
  }, []);

  return (
    <div className="App">
      <Navbar title="GitHubFinder" />
      <div className="container">
        <Search />
        <Users users={users} loading={loading} />
      </div>
    </div>
  );
};

export default App;
