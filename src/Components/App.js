import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Layouts/Navbar";
import Users from "./Users/Users";
import Search from "./Users/Search";

const baseUrl = "https://api.github.com/";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="App">
      <Navbar title="GitHubFinder" />
      <div className="container">
        <Search
          searchUser={searchUser}
          clearUser={users.length > 0 ? true : false}
          clearUsers={clearUsers}
        />
        <Users users={users} loading={loading} />
      </div>
    </div>
  );
};

export default App;
