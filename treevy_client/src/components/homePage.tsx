import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/homePage.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import logo from "../logo/templogo.svg";

export default class HomePage extends Component<any, any> {
  render() {
    return (
      <div className="grid-container">
        <div className="topbar-container">
          <div className="top-logo">
            <img src={logo} />
          </div>
          <div className="top-search-bar">
            <input type="text" id="keyboardInput" />
          </div>
          <div className="Blank"></div>
          <div className="Save">
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              style={{ backgroundColor: "#4db6ac", height: "80%" }}
            >
              Save
            </Button>
          </div>
          <div className="Share">
            <Button
              startIcon={<ShareIcon />}
              variant="contained"
              style={{
                backgroundColor: "#4db6ac",
                height: "80%",
              }}
            >
              Share
            </Button>
          </div>
          <div className="top-log-in"></div>
        </div>
        <div className="content-container">
          <div className="sidebar-container"></div>
          <div className="list-container"></div>
          <div className="graph-container"></div>
        </div>
      </div>
    );
  }
}
