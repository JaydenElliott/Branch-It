import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import HomePage from "./components/homePage/homePage";
import TestingGrounds from "./components/testing/testingGrounds";
import ListHandler from "./components/listHandling/listHandler";
import ResizableDiv from "./components/homePage/content-container/resizableDiv";
import axios from "axios";
import SideMenuBar from "./components/homePage/side-container/sideMenuBar";

class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);
  }

  testFlask = () => {
    axios
      .post("http://0.0.0.0:5000/api/v1/login", {
        data: "Treevy is awesome.",
      })
      .then((res) => {
        console.log(res);
      });
  };

  render() {
    return (
      <div className="maindiv">
        {/* <TestingGrounds /> */}
        <HomePage />
        {/* <ListHandler /> */}
        <SideMenuBar />
      </div>
    );
  }
}

export default App;
