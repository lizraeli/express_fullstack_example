import React from "react";
import { Route, Link } from "react-router-dom";
import UserList from "./userlist";
import NewUser from "./newuser";
import SingleUser from "./singleuser";

class Users extends React.Component {
  state = { users: [] };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch("/users")
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res.data });
      });
  };

  renderUserList = () => {
    const { users } = this.state;
    return <UserList users={users} />;
  };

  renderUser = props => {
    const { id } = props.match.params;
    const { users } = this.state;

    if (!users.length) {
      return <div> Loading Users ... </div>;
    }

    const selectedUser = users.find(user => user.id === Number(id));

    if (!selectedUser) {
      return <div> Could not find user </div>;
    }
    return <SingleUser user={selectedUser} fetchUsers={this.fetchUsers} />;
  };

  renderNewUser = () => {
    return <NewUser fetchUsers={this.fetchUsers} />;
  };

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/users"> User List </Link>
          {" | "}
          <Link to="/users/new"> Add New User </Link>
        </nav>

        <Route exact path="/users" render={this.renderUserList} />
        <Route path="/users/new" render={this.renderNewUser} />
        <Route path="/users/:id/edit" render={this.renderUser} />
      </div>
    );
  }
}

export default Users;
