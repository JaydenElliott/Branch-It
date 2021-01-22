import React, { Component } from "react";

// Styling
import "./topBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../assets/templogo.svg";

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="topbar-container">
        <div className="branch-it-logo">
          <img src={logo} style={{ fill: "#608c4c" }} />
        </div>
        <button className="save-button">
          <FontAwesomeIcon icon={faInbox} style={{ height: "65%" }} />
        </button>
      </div>
    );
  }
}

export default TopBar;
