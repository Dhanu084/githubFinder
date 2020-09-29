import React from "react";
import PropTypes from "prop-types";
import UserItem from "./UserItem";
const Users = ({ users }) => {
  return (
    <div style={userStyle}>
      {users.map((user) => (
        <UserItem user={user} key={user} />
      ))}
    </div>
  );
};

Users.defaultProps = {
  users: [],
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};

export default Users;
