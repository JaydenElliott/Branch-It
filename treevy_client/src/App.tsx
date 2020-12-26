import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import HomePage from "./components/homePage/homePage";
import TestingGrounds from "./components/testing/testingGrounds";
import ListHandler from "./components/listHandling/listHandler";
import LoginModal from "./components/homePage/top-bar/log-in/loginModal";

import axios from "axios";
import SideMenuBar from "./components/homePage/side-container/sideMenuBar";

export default class App extends Component<{}, { sideBarReducer: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      sideBarReducer: props.sideBarReducer,
    };
  }

  render() {
    return (
      <div className="maindiv">
        {/* <TestingGrounds /> */}
        <HomePage />
        {/* <ListHandler /> */}
        {/* <SideMenuBar /> */}
        {/* <LoginModal /> */}
      </div>
    );
  }
}
