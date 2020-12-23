import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ListImage from "../../../../componentStyles/homePage/side-container/nav-menu-items/ItemList.svg";
import "../../../../componentStyles/homePage/side-container/nav-menu-items/navItemLists.css";

export default class NavItemLists extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button className="nav-menu-lists" onClick={this.props.toggleMenuLists}>
        <img src={ListImage} className="nav-menu-lists-icon" />
      </button>
    );
  }
}
