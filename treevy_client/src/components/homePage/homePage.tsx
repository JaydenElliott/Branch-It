// Project Imports
import React, { ChangeEvent, Component } from "react";
import "../../componentStyles/homePage/homePage.css";

// Button Components
import LoginButton from "./log-in/loginButton";
import AccountButton from "./log-in/accountButton";
import MapleButton from "./maple/mapleButton";
import ShareButton from "./share/shareButton";
import SaveButton from "./save/saveButton";

// Icons
import logo from "../../logo/templogo.svg";

// Search Bar
import SearchBar from "./search-container/searchContainer";

// Lists
import TreevyList from "../listHandling/treevyList";

/**
 * NOTE!!!!
 *
 * DO NOT NEED LOCATION item number if assume that there can only be one root for tree.
 *  Tree rendering would be based off one list. Suppose list name was TODO, each "root"
 *  of that would just be a child node of TODO
 *
 * Potential in future for rendering all your trees in one diagram.
 */
const temptodo = [
  "Frontend",
  "Backend",
  "My lists button",
  "Shared lists button",
  "Fixing the search bar grid...",
  "Something else 1",
  "Something else 2",
  "Something else 3",
  "Something else 4",
  "Something else 5",
  "Something else 6",
  "Something else 7",
  "Something else 8",
  "Something else 9",
  "Something else 10",
  "Something else 11",
];

interface HomePageState {
  // Log-in
  logInModalOpen: boolean; // log-in button pressed?
  loggedIn: boolean; // is the user logged in
  logInLock: boolean;

  // Containers
  searchContainerOn: boolean; // Should the search container be displayed?
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
      logInModalOpen: false,
      loggedIn: false,
      logInLock: false,
      searchContainerOn: true,
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
        <div className="Title">Treevy</div>
        <ShareButton />
        <MapleButton />
        {this.setLoginAccountButton()}
        <div className="Sign-out"></div>
      </div>
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
        <button onClick={() => this.setState({searchContainerOn: false})}>Turn Off Search Container</button>
        {this.renderTopBar()}
        <div className="content-container">
          {this.state.searchContainerOn ? <SearchBar toDoLists={temptodo} /> : null}
        </div>
        <div className="list-container">
          {this.renderList("")} {/* FIX: render selected to-do */}
        </div>
        <div className="graph-container"></div>
      </div>
    );
  }
}
