import React, { Component } from "react";

import "../../../../componentStyles/homePage/top-bar/log-in/loginModal.css";

export default class LoginModal extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { modalOn: true };
  }

  renderModal = () => {
    if (this.state.modalOn) {
      return (
        <div className="login-modal">
          <div className="modal-window">
            <h1>Welcome Back!</h1>
            <h2>Login</h2>
            <div className="input-box">
              <input type="text" placeholder="E-mail" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Password" />
            </div>
            <div className="remember-box">
              <div className="remember-box-checkbox">
                <input type="checkbox" />
              </div>
              <div className="remember-box-text">Remember Me</div>
            </div>
            <div className="log-in-button">
              <button onClick={this.modalSwitchOff}>Log-in</button>
            </div>
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  modalSwitchOn = () => {
    this.setState({
      modalOn: true,
    });
  };

  modalSwitchOff = () => {
    this.setState({
      modalOn: false,
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: "grey", height: "100%", width: "100%" }}>
        <button onClick={this.modalSwitchOn}>Modal On</button>
        {this.renderModal()}
      </div>
    );
  }
}
