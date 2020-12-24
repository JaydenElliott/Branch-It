// Project Imports
import React, { Component } from "react";

import "../../componentStyles/homePage/homePage.css";

// Page components
import ContentContainer from "./containers/contentContainer";
import TopBar from "./top-bar/topBar";

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
      </div>
    );
  }
}
