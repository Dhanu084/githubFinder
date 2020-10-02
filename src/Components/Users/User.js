import React, { useEffect, useState, Fragment, useContext } from "react";
import axios from "axios";
import Spinner from "../Layouts/Spinner";
import { Link } from "react-router-dom";
import Users from "./Users";
import Repos from "../Layouts/Repos";
import GithubContext from "../../Context/github/GithubContext";
const baseUrl = "https://api.github.com/";

const User = (props) => {
  const githubContext = useContext(GithubContext);
  const { user, loading } = githubContext;
  useEffect(() => {
    const username = props.match.params.login;

    githubContext.getUser(username);
    githubContext.getRepos(username);
  }, [props.match.params.login]);

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

          <Repos />
        </div>
      </Fragment>
    );
  }
};

export default User;
