import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import HomePage from "./components/homePage/homePage";
import TestingGrounds from "./components/testing/testingGrounds";
import ListHandler from "./components/listHandling/listHandler";

import axios from "axios";
import SideMenuBar from "./components/homePage/side-container/sideMenuBar";

class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="maindiv">
        {/* <TestingGrounds /> */}
        <HomePage />
        {/* <ListHandler /> */}
        {/* <SideMenuBar /> */}
      </div>
    );
  }
}

export default App;
