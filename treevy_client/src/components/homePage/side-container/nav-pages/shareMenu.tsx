import React, { ChangeEvent, Component } from "react";
import "../../../../componentStyles/homePage/side-container/nav-pages/shareMenu.css";

export default class ShareMenu extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="nav-pages-share">
        <h1>Share Menu! </h1>
        <p>
          This is a nice share menu wow so awesome. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          laborum.
        </p>
      </div>
    );
  }
}
