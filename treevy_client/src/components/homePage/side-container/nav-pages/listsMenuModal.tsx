import React, { Component } from "react";

import "../../../../componentStyles/homePage/side-container/nav-pages/listsMenuModal.css";

export default class ListsMenuModal extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { modalOn: true };
  }

  renderModal = () => {
    if (this.state.modalOn) {
      return (
        <div className="lists-modal">
          <div className="modal-window">
            <h1>Welcome Back!</h1>
            <h2>Login</h2>

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
