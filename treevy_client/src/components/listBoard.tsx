import React, { Component } from "react";
import "../components/styling/listboard.css";
import Xarrow from "react-xarrows";

export default class ListBoard extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="grid">
        <div className="layer">
          Layer1
          <div id="box" />
        </div>
        <div className="layer">
          Layer2 <div id="box" />
          <div id="box" />
        </div>
        <div className="layer">
          Layer3 <div id="box" />
          <div id="box" />
          <div id="box" />
        </div>
        <div className="layer">
          Layer3 <div id="box" />
          <div id="box" />
          <div id="box" />
        </div>
      </div>
    );
  }
}
