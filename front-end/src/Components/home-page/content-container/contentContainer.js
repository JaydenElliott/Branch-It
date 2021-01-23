// External Modules
import React, { Component } from "react";

// Styling
import "./contentContainer.scss";

// Internal Components
import SideBar from "./side-bar/sideBar";
import ListNav from "./list-nav/listNav";

class ContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-container">
        <SideBar />
        <ListNav />
      </div>
    );
  }
}

export default ContentContainer;
