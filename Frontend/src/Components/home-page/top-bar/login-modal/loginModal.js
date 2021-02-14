// External Modules
import React, { Component } from "react";

// Internal Modules
import { login } from "../../../../API/users";
import { get, put } from "../../../../API/lists";

// Styling
import "./loginModal.scss";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateUserInfo,
  updateLists,
} from "../../../../redux/actions/userActions";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", feedback: "" };
  }

  handleLogInEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordEmailChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  loginFormSubmit = async (e) => {
    e.preventDefault();
    let loginObject = {
      email: this.state.email,
      password: this.state.password,
    };

    await login(loginObject)
      .then((res) => {
        // 'throw new Error()' breaks the runtime so there is no need for a break underneath.
        switch (res.status) {
          case 200: //Successful login
            this.props.updateUserInfo({ email: this.state.email });
            this.setState({ feedback: "welcome " + this.state.email });

            // Update lists that were generated prior to user logging in
            this.props.lists.forEach((list) => {
              let sendObject = {
                email: this.state.email,
                list: list,
              };

              put(sendObject)
                .then((res) => {})
                .catch((err) => console.log("error: ", err));
            });
            // Load in user lists
            get(this.state.email).then((res) => {
              switch (res.status) {
                case 200:
                  // Get all the lists from the response
                  const databaseLists = [...res.data.map((el) => el.list)];
                  // Update redux lists
                  this.props.updateLists(
                    this.props.lists.concat(databaseLists)
                  );
                  return res;
                case 404:
                  throw new Error("Email not found when retrieving lists");
                case 400:
                  throw new Error("Email not provided");
                default:
                  throw new Error("Unable to get user todo-lists");
              }
            });
            this.props.setModalState(false);
            break;
          case 400:
            throw new Error("Please provide an email and password");
          case 401:
            throw new Error("Incorrect password");
          case 404:
            // Use if condition to determine if connection failed or email could not be found.
            if (!res.data.includes("Cannot POST"))
              throw new Error("Email not found");
            else throw new Error("Failed to connect to backend");
          case 500:
            throw new Error("Whops, something has gone wrong...");
          default:
            throw new Error(
              "Sorry, we seem to be having difficulty processing the request"
            );
        }
      })
      .catch((err) => {
        // Displays error message for 8 seconds.
        this.setState({ feedback: err.message });
        setTimeout(() => this.setState({ feedback: "" }), 8000);
      });

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div
        className="login-modal-container"
        style={{
          height: `${this.props.isOpen ? 230 : 0}px`,
        }}
      >
        <div className="login-title">Welcome, please log-in</div>
        <div className="login-feedback">{this.state.feedback}</div>
        <form className="login-form" onSubmit={this.loginFormSubmit}>
          <div className="login-email">
            <input
              placeholder="email"
              onChange={this.handleLogInEmailChange}
              value={this.state.email}
            />
          </div>
          <div className="login-password">
            <input
              placeholder="password"
              type="password"
              onChange={this.handlePasswordEmailChange}
              value={this.state.password}
            />
          </div>
          <button type="submit" className="login-modal-button">
            Login
          </button>
        </form>
      </div>
    );
  }
}

// Redux mappings to props

const mapStateToProps = (state) => {
  return {
    lists: state.user.lists,
    userInfo: state.user.userInfo,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateLists,
      updateUserInfo,
    },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(LoginModal);
