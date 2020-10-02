import React, { Fragment, useContext } from "react";
import GithubContext from "../../Context/github/GithubContext";

const Repos = () => {
  const githubContext = useContext(GithubContext);
  const { user, repos } = githubContext;
  return (
    <Fragment>
      <div className="card">
        {repos &&
          repos.map((repo) => (
            <div className="card" key={repo.id}>
              <a href={repo.html_url}>{repo.name}</a>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Repos;
