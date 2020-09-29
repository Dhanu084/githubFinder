import React, { useEffect } from "react";
import axios from "axios";
const baseUrl = "https://api.github.com/";
const User = (props) => {
  useEffect(() => {
    const user = props.match.params.login;
    const url = `${baseUrl}users/${user}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    console.log(baseUrl);
    axios.get(url).then((data) => console.log(data));
  }, [props.match.params.login]);
  return <div>{props.match.params.login}</div>;
};

export default User;
