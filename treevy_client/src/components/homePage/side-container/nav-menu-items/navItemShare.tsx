import React, { ChangeEvent, Component } from "react";
import ListImage from "../../../../componentStyles/homePage/side-container/nav-menu-items/ItemShare.svg";
import "../../../../componentStyles/homePage/side-container/nav-menu-items/navItemShare.css";

export default class NavItemShare extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button className="nav-menu-share" onClick={this.props.toggleMenuShare}>
        <img src={ListImage} className="nav-menu-share-icon" />
      </button>
    );
  }
}
