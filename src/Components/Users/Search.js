import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../Context/github/GithubContext";

const Search = ({ clearUser, clearUsers, setAlert }) => {
  const githubContext = useContext(GithubContext);
  console.log(githubContext.users);
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      setAlert({ msg: "Please add a name", type: "light" });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }
    githubContext.searchUser(text);
    setText("");
  };
  const handleClear = (e) => {
    e.preventDefault();
    clearUsers();
  };
  return (
    <div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-dark btn-block">Search</button>
        {clearUser && (
          <button
            className="btn btn-light btn-block"
            onClick={(e) => handleClear(e)}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

Search.defaulProps = {
  clearUser: false,
};

Search.propTypes = {
  clearUser: PropTypes.bool.isRequired,
};
export default Search;
