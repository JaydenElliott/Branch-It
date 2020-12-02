import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/signupPage.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default class LoginButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      accountModalOpenBool: false,
      modalOpen: false,
      loggedIn: false,
      emailString: "",
      passwordString: "",
      passwordErrorMessage: "",
      logInAttempts: 0,
      logInLock: false,
    };
  }

  /**
   *
   * FUNCTIONALITY: LOG-IN BUTTON - Modal
   *
   * Modal open and close state manipulation
   */
  handleLogInModalClick = () => {
    this.setState({
      modalOpen: true,
    });
  };
  modalLogInClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  /**
   *
   * FUNCTIONALITY: ACCOUNT BUTTON - Modal
   *
   * Modal open and close state manipulation
   */
  handleAccountModalOpen = () => {
    this.setState({
      accountModalOpenBool: true,
    });
  };

  handleAccountModalClose = () => {
    this.setState({
      accountModalOpenBool: false,
    });
  };

  /**
   * FUNCTIONALITY: LOG-IN
   *
   * Handles input change for the log-in email and password fields
   */

  handleLogInEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      emailString: e.target.value,
    });
  };

  handleLogInPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      passwordString: e.target.value,
    });
  };

  /**
   * FUNCTIONALITY: LOG-IN
   *
   * Calls the appropriate functions when login is called
   */
  handleLogInClick = () => {
    let checkStatus = this.logInCheck(
      this.state.emailString,
      this.state.passwordString
    );
    if (checkStatus == true) {
      this.setState({
        modalOpen: false, // correct password was entered
      });
    } else {
      if (this.state.logInAttempts > 4) {
        this.setState({
          logInLock: true,
        });
      }
      this.setState({
        passwordErrorMessage: "Incorrect email and/or password: Try Again",
      });
    }
  };

  /**
   * FUNCTIONALITY: LOG-IN
   *
   * Checks log-in details: if correct, user is logged in and
   * button changes from "LOG-IN" to "ACCOUNT"
   * @param Email
   * @param Password
   *
   * @returns boolean: if log in was successful
   */

  logInCheck = (email: string, password: string): boolean => {
    // Suppose the following is a cache of the emails and passwords
    // Example:
    let userpass: [string, string][] = [
      ["jayden.elliott@outlook.com", "password123"],
    ];

    for (let i = 0; i < userpass.length; i++) {
      if (email == userpass[i][0]) {
        if (password == userpass[i][1]) {
          this.setState({
            loggedIn: true,
            emailString: "",
            passwordString: "",
            passwordErrorMessage: "",
            logInAttempts: 0,
          });
          return true;
        } else {
          this.setState({
            logInAttempts: this.state.logInAttempts + 1,
          });
          return false;
        }
      }
    }

    this.setState({
      logInAttempts: this.state.logInAttempts + 1,
    });
    return false; // reached end of email database; no matching email
  };

  /**
   *
   * FUNCTIONALITY: LOG-OUT
   *
   * Logs user out and changes button state from "Account" -> "Log-in"
   */
  logout = () => {
    this.setState({
      loggedIn: false,
    });
  };

  renderAccountButton = () => {
    return (
      <div className="AccountButton">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleAccountModalOpen}
          style={{ backgroundColor: "black", color: "#ffffff" }}
        >
          Check
        </Button>
        <Menu
          id="simple-menu"
          // anchorEl={anchorEl}
          keepMounted
          open={this.state.accountModalOpenBool}
          onClose={this.handleAccountModalClose}
        >
          <MenuItem onClick={this.handleAccountModalClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleAccountModalClose}>My account</MenuItem>
          <MenuItem onClick={this.handleAccountModalClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  };
  render() {
    return <div>{this.renderAccountButton()}</div>;
  }
}
