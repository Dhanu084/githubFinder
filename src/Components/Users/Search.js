import React, { useState, useContext } from "react";
import GithubContext from "../../Context/github/GithubContext";

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);
  const { clearUsers, users } = githubContext;
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
        {users.length > 0 && (
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

export default Search;
