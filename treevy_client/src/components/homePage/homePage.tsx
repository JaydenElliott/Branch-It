// Project Imports
import React, { ChangeEvent, Component } from "react";
import "../../componentStyles/homePage/homePage.css";
import Listhandler from "../listHandling/listHandler";
import ContentContainer from "./containers/contentContainer";
import TopBar from "./top-bar/topBar";

// Button Components
import LoginButton from "./top-bar/log-in/loginButton";
import AccountButton from "./top-bar/log-in/accountButton";
import MapleButton from "./top-bar/maple/mapleButton";
import ShareButton from "./top-bar/share/shareButton";
import SaveButton from "./top-bar/save/saveButton";
import CompactButton from "./top-bar/compactButton/compactButton";

// Icons
import logo from "../../logo/templogo.svg";

// Lists
import TreevyList from "../listHandling/treevyList";

export default class HomePage extends Component<any, any> {
  /**
   *
   * @param props:
   *    - toDoLists: string[] // FIX: change to a TreevyList[] (add 'name' to TreevyList state)
   */
  constructor(props: any) {
    super(props);
    this.state = {};
  }

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
        <TopBar />
        <ContentContainer />
        <div className="graph-container"></div>
      </div>
    );
  }
}
