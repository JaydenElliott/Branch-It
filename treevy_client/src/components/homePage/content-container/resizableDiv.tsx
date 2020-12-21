import React, { Component } from "react";
// import "../../../componentStyles/testing/testingGrounds.css";
import "../../../componentStyles/homePage/content-container/resizableDiv.css";

export default class ResizableDiv extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isResize: false,
      prevX: 0,
      newWidth: {},
    };
  }

  handleMouseDown = (_e: any) => {
    this.setState({ isResizing: true, lastDownX: _e.clientX });
  };

  handleMouseMove = (_e: any) => {
    if (this.state.isResize == false) {
      return;
    }

    let offsetRight =
      document.body.offsetWidth - (_e.clientX - document.body.offsetLeft);
    let minWidth = 50;
    let maxWidth = 600;
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      this.setState({ newWidth: { width: offsetRight } });
    }
  };

  handleMouseUp = (_e: any) => {
    this.setState({ isResizing: false });
  };

  componentDidMount() {
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    document.addEventListener("mouseup", (e) => this.handleMouseUp(e));
  }

  render() {
    return <div></div>;
  }
}
