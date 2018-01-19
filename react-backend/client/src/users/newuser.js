import React from "react";
import axios from "axios";

class NewUser extends React.Component {
  state = { usernameInput: "", message: "" };

  handleChange = e => {
    this.setState({
      usernameInput: e.target.value,
      message: ""
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput } = this.state;

    if (usernameInput.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }
    axios
      .post("/users/new", {
        username: this.state.usernameInput
      })
      .then(res => {
        this.props.fetchUsers();
        this.setState({ usernameInput: "", message: "Inserted User" });
      })
      .catch(err => {
        this.setState({
          message: `Error inserting user: ${err.response.data}`
        });
      });
  };

  render() {
    const { usernameInput, message } = this.state;
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={usernameInput}
              onChange={this.handleChange}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
        <p>{message}</p>
      </div>
    );
  }
}

export default NewUser;
