import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Spinner from "../Layouts/Spinner";
import { Link } from "react-router-dom";
import Users from "./Users";

const baseUrl = "https://api.github.com/";
const User = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = props.match.params.login;
    const url = `${baseUrl}users/${user}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    console.log(baseUrl);
    setLoading(true);
    axios.get(url).then((data) => {
      console.log(data);
      setUser(data.data);
      setLoading(false);
    });
    const repoUrl = `${baseUrl}users/${user}/repos?per_page=5&sort=created:asc&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    axios.get(repoUrl).then((data) => {
      setUser((prevUser) => ({
        ...prevUser,
        repos: data.data,
      }));
    });
  }, [props.match.params.login]);
  console.log(user);
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/">
          <button className="btn btn-light">Back to Search</button>
        </Link>
        Hireable:{" "}
        {user.hireable ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times-circle text-danger"></i>
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={user.avatar_url}
              className="round-img"
              alt=""
              style={{ width: "150px" }}
            />
            <h1>{user.name}</h1>
            <p>{user.location}</p>
          </div>
          <div>
            {user.bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{user.bio}</p>
              </Fragment>
            )}
            <a href={user.html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>
            <ul>
              <li>
                {user.login && (
                  <Fragment>
                    <strong>Username:</strong> {user.login}
                  </Fragment>
                )}
              </li>
              <li>
                {user.blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {user.blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {user.followers}</div>
          <div className="badge badge-success">Following: {user.following}</div>
          <div className="badge badge-light">
            Public Repos: {user.public_repos}
          </div>
          <div className="badge badge-dark">
            Public Gists: {user.public_gists}
          </div>
        </div>
        <div className="card">
          {user.repos &&
            user.repos.map((repo) => (
              <div className="card" key={repo.id}>
                <a href={repo.html_url}>{repo.name}</a>
              </div>
            ))}
        </div>
      </Fragment>
    );
  }
};

export default User;
