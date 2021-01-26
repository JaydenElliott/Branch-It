// External Modules
import React, { Component } from "react";

// Internal Modules
import { postLogin } from "../../../../API/login/loginAPI";

// Styling
import "./loginModal.scss";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
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

    await postLogin(loginObject).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
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
        {" "}
        <div className="login-title">Welcome, please log-in</div>
        <form className="login-form" onSubmit={this.loginFormSubmit}>
          <div className="login-email">
            <input placeholder="email" onChange={this.handleLogInEmailChange} value={this.state.email} />
          </div>
          <div className="login-password">
            <input
              placeholder="password"
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

export default LoginModal;
