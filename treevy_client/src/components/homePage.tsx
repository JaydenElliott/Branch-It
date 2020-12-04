// Project Imports
import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/homePage.css";

// Button Components
import LoginButton from "./homePageButtons/loginButton";
import MapleButton from "./homePageButtons/mapleButton";
import ShareButton from "./homePageButtons/shareButton";
import SaveButton from "./homePageButtons/saveButton";
import AccountButton from "./homePageButtons/accountButton";

// Button
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton"; // for sign-out

// Icons
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import logo from "../logo/templogo.svg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp"; // for sign-out
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

// Search Bar
import SearchBar from "./homePageButtons/searchBar";

// Log-in Dialog (modal)
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TreevyList from "./treevyList";
import { Typography } from "@material-ui/core";

interface HomePageState {
  // Log-in
  logInModalOpen: boolean; // log-in button pressed?
  loggedIn: boolean; // is the user logged in
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
      displayedToDoLists: this.props.toDoLists,
      logInModalOpen: false,
      loggedIn: false,
      selectedList: "",
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
    this.props.toDoLists.forEach((toDo: string) => {
      // To ensure that the search is not case sensitive, both are set to lower case.
      if (toDo.toLowerCase().includes(e.currentTarget.value.toLowerCase())) {
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

  /**
   * RENDERING: top bar of home page
   */
  renderTopBar = (): JSX.Element => {
    return (
      <div className="topbar-container">
        <div className="top-logo">
          <img src={logo} style={{ fill: "#608c4c" }} />
        </div>
        <div className="Blank" />
        <div className="Blank" />
        <SaveButton />
        <SearchBar handleChange={this.onSearchChange} />
        <div className="Title">Treevy</div>
        <ShareButton />
        <MapleButton />
        {this.setLoginAccountButton()}
        <div className="Sign-out"></div>
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
    // todo should render the list, not just a string of the list!
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
