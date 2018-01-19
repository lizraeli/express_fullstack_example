import React from "react";
import { Route, Link } from "react-router-dom";
import UserList from "./userlist";
import NewUser from "./newuser";
import SingleUser from "./singleuser";

class Users extends React.Component {
  state = { users: [] };

  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res.data });
      });
  }

  renderUserList = () => {
    const { users } = this.state;
    console.log("users: ", users);
    return <UserList users={users} />;
  };

  addUser = user => {
    const { users } = this.state;
    this.setState({
      users: [...users, user]
    });
  };

  updateUser = ({ username, newName }) => {
    const { users } = this.state;

    const newUsers = users.map(user => {
      if (user.username === username) {
        return { ...user, username: newName };
      } else {
        return user;
      }
    });

    // The above with the ternary operator
    // const newUsers = users.map(user =>
    //   user.username === username ? { ...user, username: newName } : user )

    this.setState({ users: newUsers });
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
    console.log("users.js render user");
    return <SingleUser user={selectedUser} updateUser={this.updateUser} />;
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
        <Route path="/users/new" component={NewUser} />
        <Route path="/users/:id/edit" render={this.renderUser} />
      </div>
    );
  }
}

export default Users;
