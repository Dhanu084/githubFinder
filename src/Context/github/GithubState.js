import React, { useReducer } from "react";
import axios from "axios";

import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import {
  SEARCH_USER,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS,
} from "../types";

const baseUrl = "https://api.github.com/";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUser = async (text) => {
    setLoading();
    const data = await axios.get(
      `${baseUrl}search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USER,
      payload: data.data.items,
    });
  };

  const getUser = async (user) => {
    const url = `${baseUrl}users/${user}?client_id=${githubClientId}&client_secret=${githubClientSecret}`;
    setLoading();
    const result = await axios.get(url);
    dispatch({
      type: GET_USER,
      payload: result.data,
    });
  };

  const getRepos = async (user) => {
    setLoading();
    const repoUrl = `${baseUrl}users/${user}/repos?per_page=5&sort=created:asc&?client_id=${githubClientId}&client_secret=${githubClientSecret}`;
    const result = await axios.get(repoUrl);

    dispatch({
      type: GET_REPOS,
      payload: result.data,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };
  const setLoading = () => dispatch({ type: SET_LOADING });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUser,
        getUser,
        getRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
