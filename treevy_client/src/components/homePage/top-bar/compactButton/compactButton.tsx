import React, { ChangeEvent, Component } from "react";
import CompactButtonSvg from "../../../../componentStyles/homePage/top-bar/compact-button/compactButton.svg";

export default class CompactButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        onClick={this.props.toggleMenuLists}
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
        }}
      >
        <img src={CompactButtonSvg} style={{ fill: "white" }} />
      </button>
    );
  }
}
