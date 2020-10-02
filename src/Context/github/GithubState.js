import React, { useReducer } from "react";
import axios from "axios";

import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import { SEARCH_USER, SET_LOADING } from "../types";

const baseUrl = "https://api.github.com/";
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUser = async (text) => {
    console.log("callig");
    setLoading();
    const data = await axios.get(
      `${baseUrl}search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(data);
    dispatch({
      type: SEARCH_USER,
      payload: data.data.items,
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
