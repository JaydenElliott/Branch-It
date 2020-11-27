import React, { ChangeEvent, Component } from "react";
import "../components/styling/welcomePage.css";
import logo from "../logo/templogo.svg";
export default class WelcomePage extends Component<any, any> {
  render() {
    return (
      <div className="grid-container">
        <div className="logo-container">
          <img src={logo} id="logo" />
        </div>
        <div className="treevy"></div>
        <div className="sign-in"></div>
        <div className="sign-up"></div>
      </div>
    );
  }
}
