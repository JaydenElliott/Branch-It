import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "../../../componentStyles/homePage/side-container/sideMenuBar.css";
import "./nav-menu-items/navItemLists";
import NavItemLists from "./nav-menu-items/navItemLists";
import Draggable from "react-draggable";

import TempListsMenu from "./nav-pages/listsMenu";
import TempSharedMenu from "./nav-pages/sharedMenu";
export default class SideMenuBar extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      menuLists_Open: false,
      menuShared_Open: false,
      menuWidth: 300,
    };
  }

  toggleMenuLists = async () => {
    await this._setMenuStateAsync_lists();
  };

  /**
   *
   * To prevent asyncronous issues with set state
   */
  _setMenuStateAsync_lists = () => {
    return new Promise((resolve) => {
      if (this.state.menuLists_Open == false) {
        this.setState({
          menuLists_Open: true,
          menuShared_Open: false, // safety
        });
      } else {
        this.setState({
          menuLists_Open: false,
          menuShared_Open: false, // safety
        });
      }
      this.setState(resolve);
    });
  };

  renderResizePanel = () => {
    let navpagesRect = document.querySelector("#nav-pages");
    let rect = navpagesRect?.getBoundingClientRect();
    if (
      this.state.menuLists_Open == false &&
      this.state.menuShared_Open == false
    ) {
      return;
    } else {
      return (
        <div
          className="nav-pages"
          id="nav-pages"
          style={{ width: this.state.menuWidth + "px" }}
        >
          {this.state.menuLists_Open ? <TempListsMenu /> : null}
          {this.state.menuShared_Open ? <TempSharedMenu /> : null}

          <Draggable
            axis="x"
            onDrag={(data: any) => {
              this.setState({
                menuWidth: data.clientX - (rect?.x ? rect?.x : 0),
              });
            }}
            scale={0}
          >
            <div className="resize-panel"></div>
          </Draggable>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="side-menu-bar-container">
        <div className="nav-menu">
          <div className="nav-menu-item-1">
            <NavItemLists toggleMenuLists={this.toggleMenuLists} />
          </div>
          <div className="nav-menu-item-2"></div>
          <div className="nav-menu-item-3"></div>
          <div className="nav-menu-item-4"></div>
          <div className="nav-menu-item-5"></div>
        </div>
        {this.renderResizePanel()}
        <div className="blank" />
      </div>
    );
  }
}
