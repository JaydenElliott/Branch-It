import React, { Component } from "react";

import "../../../componentStyles/homePage/top-bar/topBar.css";

// Buttons
import AccountButton from "./log-in/accountButton";
import MapleButton from "./maple/mapleButton";
import ShareButton from "./share/shareButton";
import SaveButton from "./save/saveButton";
import LoginButton from "./log-in/loginButton";
import LoginModal from "./log-in/loginModal";
import CompactButton from "./compactButton/compactButton";

import logo from "../../../logo/templogo.svg";

export default class TopBar extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      logInModalOpen: false,
      loggedIn: false,
      logInLock: false,
    };
  }

  /**
   *
   * FUNCTIONALITY: LOG-IN BUTTON - Modal
   *
   * Modal open and close state manipulation
   */
  modalClickOpen = () => {
    this.setState({
      logInModalOpen: true,
    });
  };
  modalClickClose = () => {
    this.setState({
      logInModalOpen: false,
    });
  };

  /**
   * FUNCTIONALITY: LOG-OUT
   *
   * Logs user out and changes button state from "Account" -> "Log-in"
   */
  logout = () => {
    this.setState({
      loggedIn: false,
    });
  };

  /**
   * FUNCTIONALITY: INTERACTION <LoginButton/> <HomePage/>
   *
   * 1. Set logged-in
   * 2. Set log-in lock
   */
  _LoginButtonLoggedIn = () => {
    this.setState({
      loggedIn: true,
    });
  };

  _LoginButtonLogInLockOn = () => {
    this.setState({
      logInLock: true,
    });
  };

  setLoginAccountButton = () => {
    if (this.state.loggedIn == false) {
      return (
        <LoginButton
          logInLock={this.state.logInLock}
          modalClickOpen={this.modalClickOpen}
          modalClickClose={this.modalClickClose}
          logInModalOpen={this.state.logInModalOpen}
          setLoggedIn={this._LoginButtonLoggedIn}
          setLogInLockOn={this._LoginButtonLogInLockOn}
        />
      );
    } else {
      return <AccountButton />;
    }
  };

  render() {
    return (
      <div className="topbar-container">
        <div className="top-bar-column-1">
          <div className="top-bar-column-1-logo">
            <img src={logo} style={{ fill: "#608c4c" }} />
          </div>
          <div className="top-bar-column-1-save">
            <SaveButton />
          </div>
        </div>
        <div className="top-bar-column-2">
          <div className="top-bar-column-2-title">Treevy</div>
        </div>
        <div className="top-bar-column-3">
          <ShareButton />
          <MapleButton />
          <CompactButton />
          {this.setLoginAccountButton()}
        </div>
      </div>
    );
  }
}
