import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import ListBoard from "./components/listBoard";
import ListHandler from "./components/listHandler";
import HomePage from "./components/homePage";
import SignUpPage from "./components/signupPage";
import TestingGrounds from "./components/testingGrounds";
import AccountButton from "./components//homePageButtons/accountButton";
import LogInButton from "./components/homePageButtons/loginButton";
import axios from "axios";

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
        {/* <HomePage toDoLists={temptodo} /> */}
        <ListHandler />
        {/* <WelcomePage /> */}
        {/* {this.renderList()} */}
        {/* {this.renderListBoard()} */}
        {/* <SignUpPage /> */}
      </div>
    );
  }
}

export default App;
