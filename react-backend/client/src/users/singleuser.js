import React from "react";
import axios from "axios";

class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    console.log("singleuser props: ", props);
    this.state = {
      editing: false,
      newName: props.user.username,
      message: ""
    };
  }

  switchMode = () => {
    const lastMode = this.state.editing;

    this.setState({
      editing: !lastMode
    });
  };

  handleChange = e => {
    this.setState({
      newName: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { username } = this.props.user;
    const { newName } = this.state;

    if (newName.length < 3) {
      this.setState({
        message: "Username length must be at least 3"
      });
      return;
    }

    axios
      .patch(`/users/${this.props.user.username}/edit`, {
        username,
        newName
      })
      .then(res => {
        console.log("updated user");
        this.props.updateUser({ username, newName });
        this.setState({ editing: false });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          message: `error changing username: ${err.response.data}`
        });
      });
  };

  render() {
    let { editing, newName, message } = this.state;
    const { username } = this.props.user;

    if (!editing) {
      return (
        <div>
          <h3> {username} </h3>
          <button onClick={this.switchMode}> Edit </button>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.submitForm}>
            <label>
              New Username:
              <input
                value={newName}
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </label>

            <input type="submit" value="Submit" />
          </form>

          <button onClick={this.switchMode}> Cancel </button>
          <p>{message}</p>
        </div>
      );
    }
  }
}

export default SingleUser;
