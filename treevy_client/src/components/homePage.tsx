// Project Imports
import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/homePage.css";

// Button
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton"; // for sign-out

// Icons
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import EcoIcon from "@material-ui/icons/Eco";
import logo from "../logo/templogo.svg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp"; // for sign-out
import SearchIcon from "@material-ui/icons/Search";

// Search Bar
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

// Log-in Dialog (modal)
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TreevyList from "./treevyList";
import { Typography } from "@material-ui/core";

interface HomePageState {
  // Search-Bar
  sString: string;

  // Log-in
  modalOpen: boolean; // log-in button pressed?
  loggedIn: boolean; // is the user logged in
  emailString: string; // input field  email string
  passwordString: string; //input field  password string
  passwordErrorMessage: string;
  logInAttempts: number;
  logInLock: boolean;

  // Todo-list
  selectedList: string;
  displayedToDoLists: string[]; // To-do lists displayed to the user according to the search
}

export default class HomePage extends Component<any, HomePageState> {
  /**
   *
   * @param props:
   *    - toDoLists: string[] // FIX: change to a TreevyList[] (add 'name' to TreevyList state)
   */
  constructor(props: any) {
    super(props);

    this.state = {
      sString: "",
      displayedToDoLists: this.props.toDoLists,
      modalOpen: false,
      loggedIn: false,
      selectedList: "",
      emailString: "",
      passwordString: "",
      passwordErrorMessage: "",
      logInAttempts: 0,
      logInLock: false,
    };
  }

  /**
   *
   * FUNCTIONALITY: SEARCH BAR
   *
   * Changes the provided search contents to represent the search.
   * @param e current input
   */
  onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // If the to-do lists prop was not provided, do nothing.
    if (this.state.displayedToDoLists === undefined) return;

    // Finds all lists containing the searched word
    let newDisplayedList: string[] = [];
    const currentSearch: string = e.currentTarget.value;
    this.props.toDoLists.forEach((toDo: string) => {
      // To ensure that the search is not case sensitive, both are set to lower case.
      if (toDo.toLowerCase().includes(currentSearch.toLowerCase())) {
        newDisplayedList.push(toDo);
      }
    });

    // Sets new displayed lists
    this.setState({
      displayedToDoLists: newDisplayedList,
    });
  };

  /**
   *
   * FUNCTIONALITY: LOG-IN BUTTON - Modal
   *
   * Modal open and close state manipulation
   */
  modalClickOpen = () => {
    this.setState({
      modalOpen: true,
    });
  };
  modalClickClose = () => {
    this.setState({
      modalOpen: false,
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

  /**
   * RENDERING: top bar of home page
   */
  renderTopBar = (): JSX.Element => {
    return (
      <div className="topbar-container">
        {/* Search bar */}
        <form
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
          style={{ height: "100%" }}
        >
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search"
            variant="filled"
            size="small"
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                fontSize: "large",
                fontFamily: "handWritten",
              },
            }}
            onChange={this.onSearchChange}
            style={{ width: "221%", minHeight: "10px" }}
          ></TextField>
        </form>

        <div className="top-logo">
          <img src={logo} style={{ fill: "#608c4c" }} />
        </div>
        <div className="Blank" />
        <div className="Blank" />
        <div className="Save">
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            style={{
              backgroundColor: "#608C4C",
              height: "80%",
              color: "#ffffff",
            }}
          >
            Save
          </Button>
        </div>
        <div className="Title">Treevy</div>
        <div className="Share">
          <Button
            startIcon={<ShareIcon />}
            variant="contained"
            style={{
              backgroundColor: "#608C4C",
              height: "80%",
              color: "#ffffff",
            }}
          >
            Share
          </Button>
        </div>
        <div className="Maple">
          <Button
            startIcon={<EcoIcon />}
            variant="contained"
            style={{
              backgroundColor: "#2196f3",
              height: "80%",
              color: "#ffffff",
            }}
          >
            Maple
          </Button>
        </div>
        <div className="Log-in">
          <Button
            startIcon={<PersonIcon />}
            disabled={this.state.logInLock}
            onClick={this.modalClickOpen}
            variant="contained"
            style={{
              backgroundColor: this.state.logInLock ? "#C9CAD3" : "#608C4C",
              height: "80%",
              color: "#ffffff",
            }}
          >
            Log-in
          </Button>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Dialog
              open={this.state.modalOpen && !this.state.logInLock}
              onClose={this.modalClickClose}
              aria-labelledby="form-dialog-title"
              id="login-modal"
            >
              <DialogTitle id="form-dialog-title">
                <span style={{ fontSize: "25px" }}>Welcome Back</span>
              </DialogTitle>
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
                <Button onClick={this.modalClickClose}>Cancel</Button>
                <Button onClick={this.handleLogInClick}>Log-in</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="Sign-out">
          {/* <IconButton style={{ backgroundColor: "#608C4C" }}>
              <ExitToAppIcon
                style={{
                  color: "#ffffff",
                }}
              />
            </IconButton> */}
        </div>
      </div>
    );
  };

  /**
   *
   * FUNCTIONALITY: SEARCH BAR
   *
   * Displays the user's to-do lists given the current search input.
   */
  displayToDoLists = (): JSX.Element | void => {
    // If the to-do list is not provided, do nothing.
    if (this.state.displayedToDoLists === undefined) return;

    return (
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        {this.state.displayedToDoLists.map((list) => (
          <div>{this.renderListOption(list)}</div>
        ))}
      </div>
    );
  };

  /**
   * RENDERING: displays a button (in the side-search-bar) which can be
   *            pressed to select that particular list to display
   *            (in the list-container).
   *
   * @param listOption a displayed selectable list option
   */
  renderListOption = (listOption: string): JSX.Element => {
    return (
      <Button
        disableRipple
        variant="contained"
        style={
          listOption === this.state.selectedList
            ? {
                fontSize: "2vh",
                textTransform: "none",
                display: "flex",
                margin: "4%",
                width: "20vw",
                boxShadow: "none",
                backgroundColor: "#608C4C",
                borderColor: "black",
                color: "#ffffff",
              }
            : {
                fontSize: "2vh",

                textTransform: "none",
                display: "flex",
                margin: "4%",
                width: "20vw",
              }
        }
        onClick={() => this.setState({ selectedList: listOption })}
      >
        {listOption}
      </Button>
    );
  };

  /**
   * RENDERING: provided a treevylist (or null) will render it.
   *
   * @param toDo list
   */
  renderList = (toDo: string | null): JSX.Element | null => {
    // TODO: should render the list, not just a string of the list!
    // If null, do nothing. Note that void is not assignable to a react node so null must be returned instead.
    if (toDo === null || toDo == "") return null;

    return <div>This is the {toDo} list!</div>;
  };

  render() {
    return (
      <div className="grid-container">
        {this.renderTopBar()}
        <div className="content-container">
          <div className="sidebar-container">
            {this.displayToDoLists()}
            <div className="side-search-bar">
              {/* <input type="text" id="keyboardInput" /> */}
            </div>
          </div>
          <div className="list-container">
            {this.renderList(this.state.selectedList)}
          </div>
          <div className="graph-container"></div>
        </div>
      </div>
    );
  }
}
