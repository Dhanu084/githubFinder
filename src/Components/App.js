import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Layouts/Navbar";
import Users from "./Users/Users";

const baseUrl = "https://api.github.com/";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(`${baseUrl}/users`);
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
        <Users users={users} />
      </div>
    </div>
  );
};

export default App;
