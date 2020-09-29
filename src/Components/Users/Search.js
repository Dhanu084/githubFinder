import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUser, clearUser, clearUsers, setAlert }) => {
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
    searchUser(text);
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
  searchUser: {},
  clearUser: false,
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUser: PropTypes.bool.isRequired,
};
export default Search;
