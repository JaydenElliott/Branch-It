import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/homePage.css";

export default class HomePage extends Component<any, any> {
  render() {
    return (
      <div className="grid-container">
        <div className="content-container">
          <div className="sidebar-container"></div>
          <div className="list-container"></div>
          <div className="graph-container"></div>
        </div>
        <div className="topbar-container"></div>
      </div>
    );
  }
}
