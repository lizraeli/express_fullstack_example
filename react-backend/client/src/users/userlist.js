import React from "react";
import { Link } from "react-router-dom";

const UserList = props => {
  const { users } = props;

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => {
        const { id, username } = user;
        return (
          <Link key={id} to={`/users/${id}/edit`}>
            <div>{username}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default UserList;
