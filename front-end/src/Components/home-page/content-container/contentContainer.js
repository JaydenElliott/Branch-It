// External Modules
import React, { Component } from "react";

// Styling
import "./contentContainer.scss";
import SideBar from "./side-bar/sideBar";

export default class ContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-container">
        <SideBar />
      </div>
    );
  }
}
