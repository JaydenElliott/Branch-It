import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "../../../componentStyles/homePage/side-container/sideMenuBar.css";
import "./nav-menu-items/navItemLists";
import NavItemLists from "./nav-menu-items/navItemLists";
export default class SideMenuBar extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="side-menu-bar-container">
        <div className="nav-menu">
          <div className="nav-menu-item-1">
            <NavItemLists />
          </div>
          <div className="nav-menu-item-2"></div>
          <div className="nav-menu-item-3"></div>
          <div className="nav-menu-item-4"></div>
          <div className="nav-menu-item-5"></div>
        </div>
        <div className="nav-menu-results"></div>
      </div>
    );
  }
}
