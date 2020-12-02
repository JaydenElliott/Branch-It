import React, { Component } from "react";

export default class TestingGrounds extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <canvas
          ref="canvas"
          style={{
            height: "50vh",
            width: "50vw",
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            backgroundColor: "black",
            // padding-left: "0",
            // padding-right: "0",
            // margin-left: "auto",
            // margin-right: "auto",
            // display: "block",
          }}
        ></canvas>
      </div>
    );
  }
}
