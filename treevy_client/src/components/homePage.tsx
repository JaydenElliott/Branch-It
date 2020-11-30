import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/homePage.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import EcoIcon from "@material-ui/icons/Eco";
import logo from "../logo/templogo.svg";

export default class HomePage extends Component<any, any> {
  render() {
    return (
      <div className="grid-container">
        <div className="topbar-container">
          <div className="top-logo">
            <img src={logo} style={{ fill: "#608c4c" }} />
          </div>
          <div className="Blank" />
          <div className="Blank" />
          <div className="Save">
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              style={{
                backgroundColor: "#608C4C",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Save
            </Button>
          </div>
          <div className="Title">Treevy</div>
          <div className="Share">
            <Button
              startIcon={<ShareIcon />}
              variant="contained"
              style={{
                backgroundColor: "#608C4C",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Share
            </Button>
          </div>
          <div className="Maple">
            <Button
              startIcon={<EcoIcon />}
              variant="contained"
              style={{
                backgroundColor: "#2196f3",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Maple
            </Button>
          </div>
          <div className="Log-in">
            <Button
              startIcon={<PersonIcon />}
              variant="contained"
              style={{
                backgroundColor: "#608C4C",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Log-in
            </Button>
          </div>
        </div>

        <div className="content-container">
          <div className="sidebar-container">
            <div className="side-search-bar">
              {/* <input type="text" id="keyboardInput" /> */}
            </div>
          </div>
          <div className="list-container"></div>
          <div className="graph-container"></div>
        </div>
      </div>
    );
  }
}
