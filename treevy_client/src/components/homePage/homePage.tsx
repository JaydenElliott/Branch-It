// Project Imports
import React, { ChangeEvent, Component } from "react";
import "../../componentStyles/homePage/homePage.css";
import Listhandler from "../listHandling/listHandler";

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
        <SaveButton />
        <div className="Title">Treevy</div>
        <div className="SML-Buttons">
          <ShareButton />
          <MapleButton />
          {this.setLoginAccountButton()}
        </div>
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
        {this.renderTopBar()}
        <div className="content-container">
          {this.state.searchContainerOn ? <SearchBar /> : null}
        </div>
        <div className="list-container">
          {this.renderList("")} {/* FIX: render selected to-do */}
        </div>
        <div className="graph-container" onClick={() => alert("hello")}></div>
      </div>
    );
  }
}
