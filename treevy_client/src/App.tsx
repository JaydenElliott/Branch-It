import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import ListBoard from "./components/listHandling/listBoard";
import ListHandler from "./components/listHandling/listHandler";
import HomePage from "./components/homePage/homePage";
import SignUpPage from "./components/homePage/sign-up/signupPage";
import TestingGrounds from "./components/testing/testingGrounds";
import AccountButton from "./components/homePage/log-in/accountButton";
import LogInButton from "./components/homePage/log-in/loginButton";

import axios from "axios";

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
];

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
        <HomePage toDoLists={temptodo} />
        {/* <ListHandler /> */}
        {/* <SignUpPage /> */}
      </div>
    );
  }
}

export default App;
