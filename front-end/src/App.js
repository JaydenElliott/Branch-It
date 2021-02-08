import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.scss";

// Green #608c4c;

// Internal Components
import HomePage from "./Components/home-page/homepage";

class App extends Component {
  constructor(props) {
    super(props);
  }

  test = () => {
    const something = {
      1 : {
        name: 'test',
        children: [2, 3],
      },
      2 : {
        name: 'what',
        children: [],
      },
      3 : {
        name: 'some',
        children: [],
      },
    }

    return something[1];
  }

  render() {
    // console.log(this.test());
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
