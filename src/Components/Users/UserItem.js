import React from "react";
import PropTypes from "prop-types";

const UserItem = ({ user }) => {
  return (
    <div className="card text-center">
      <img
        src={user.avatar_url}
        className="round-img"
        style={{ width: "60px" }}
      ></img>
      <h3>{user.login}</h3>
      <div>
        <a href={user.html_url} className="btn btn-dark btn-sm my-1">
          More
        </a>
      </div>
    </div>
  );
};

UserItem.defaultProps = {
  user: {},
};

UserItem.prototypes = {
  user: PropTypes.object.isRequired,
};
export default UserItem;
