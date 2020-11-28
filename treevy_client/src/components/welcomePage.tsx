import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/welcomePage.css";
import logo from "../logo/templogo.svg";
export default class WelcomePage extends Component<any, any> {
  render() {
    return (
      <div className="grid-container">
        <div className={"logo-wrapper"}>
          <div />
          <div className="logo-container">
            <img src={logo} id="logo" />
          </div>
          <div />
        </div>
        <div className="treevy-text-wrapper">
          <div className="treevy-text">Treevy!</div>
        </div>
        <div className="sign-in-wrapper">
          <button className="sign-in">Sign-In</button>
        </div>
        <div className="sign-up"></div>
      </div>
    );
  }
}
