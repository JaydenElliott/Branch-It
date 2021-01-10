import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import HomePage from "./components/homePage/homePage";
import TestingGrounds from "./components/testing/testingGrounds";
import ListHandler from "./components/listHandling/listHandler";
import LoginModal from "./components/homePage/top-bar/log-in/loginModal";

import axios from "axios";
import SideMenuBar from "./components/homePage/side-container/sideMenuBar";
import ListsMenuModal from "./components/homePage/side-container/nav-pages/listsMenuModal";
import { ListState } from "./components/listHandling/treevyList";
import TreevyList from "./components/listHandling/treevyList";
//test

var list: ListState = {
  lists: [],
  done: false,
  content: "Finish Treevy",
  location: [1, 3],
  coordinates: [-1, -1],
  width: 5,
  parent: undefined,
};
let newList = new TreevyList(list);

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
        <TestingGrounds />
        {/* <HomePage /> */}
        {/* <ListHandler /> */}
        {/* <SideMenuBar /> */}
        {/* <LoginModal /> */}
        {/* <ListsMenuModal list={newList} /> */}
      </div>
    );
  }
}
