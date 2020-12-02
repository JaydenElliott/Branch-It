import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";

// Modal
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TreevyList from "./treevyList";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import PersonIcon from "@material-ui/icons/Person";

export default class LoginButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      emailString: "",
      passwordString: "",
      passwordErrorMessage: "",
      logInAttempts: "",
      loggingIn: false,
    };
  }

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
   * Async as it must make an asynchronous backend call.
   *
   * Calls the appropriate functions when login is called
   */
  handleLogInClick = async () => {
    // Set state to logging in.
    this.setState({ loggingIn: true });

    // Awaits a return from the login async method before taking action.
    await this.logInCheck(this.state.emailString, this.state.passwordString)
      .then((checkStatus: any) => {
        if (checkStatus == true) {
          this.props.setLoggedIn();
          this.props.modalClickClose();
        } else {
          if (this.state.logInAttempts > 4) {
            this.props.setLogInLockOn();
          }
          this.setState({
            passwordErrorMessage: "Incorrect email and/or password: Try Again",
          });
        }
      })
      .catch((err) => {
        // Some error occurs. Perhaps a connection failure.
        console.log("Error when trying to login: " + err);
        this.setState({
          passwordErrorMessage:
            "Failed to connect, please check your connection and try again",
        });
      })
      .finally(() => {
        // This will be run regardless of whether it was successful or not.
        this.setState({ loggingIn: false });
      });
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
  logInCheck = async (email: string, password: string): Promise<boolean> => {
    // Simulating a call to the backend
    //TODO: actually call the backend.
    await new Promise(function (resolve, reject) {
      // Timeout if no response is provided.
      setTimeout(resolve, 1000);
    })
      .then((res) => {
        // Successful retrieval from backend
      })
      .catch((err) => {
        // Error. Was unable to retrieve data.
        console.log("ERROR:", err.message);
      });

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

  renderLogInButton = () => {
    return (
      <div style={{ height: "80%" }}>
        <Button
          startIcon={<PersonIcon />}
          disabled={this.props.logInLock}
          onClick={this.props.modalClickOpen}
          variant="contained"
          style={{
            backgroundColor: this.props.logInLock ? "#C9CAD3" : "#608C4C",
            height: "100%",
            color: "#ffffff",
          }}
        >
          Log-in
        </Button>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Dialog
            open={this.props.logInModalOpen && !this.props.logInLock}
            onClose={this.props.modalClickClose}
            aria-labelledby="form-dialog-title"
            id="login-modal"
          >
            <DialogTitle id="form-dialog-title">
              <span style={{ fontSize: "25px" }}>Welcome Back</span>
            </DialogTitle>
            <form onSubmit={(e) => e.preventDefault()}>
              <DialogContent>
                <Typography style={{ color: "red" }}>
                  {this.state.passwordErrorMessage}
                </Typography>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  value={this.state.emailString}
                  onChange={this.handleLogInEmailChange}
                  fullWidth
                  inputProps={{
                    style: {
                      fontSize: "large",
                    },
                  }}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  value={this.state.passwordString}
                  onChange={this.handleLogInPasswordChange}
                  fullWidth
                  inputProps={{
                    style: {
                      fontSize: "large",
                    },
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.modalClickClose}>Cancel</Button>
                <Button
                  disabled={this.state.loggingIn}
                  type="submit"
                  onClick={this.handleLogInClick}
                >
                  {this.state.loggingIn ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Log-in"
                  )}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </div>
    );
  };

  render() {
    return this.renderLogInButton();
  }
}
