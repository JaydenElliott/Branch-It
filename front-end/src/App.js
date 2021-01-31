import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.scss";

// Internal Components
import HomePage from "./Components/home-page/homepage";

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="app-container">
        <HomePage />
      </div>
    );
  }
}

export default App;

// If error with sass
//https://stackoverflow.com/questions/64625050/error-node-sass-version-5-0-0-is-incompatible-with-4-0-0
