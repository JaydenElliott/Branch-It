import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

export default class TestingGrounds extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/* {elements3.map((value: any, _: any) => {
          let id = value["id"];
          let content = value["data"]["label"];
          let coords = value["position"];
          return this.testing(id, content, coords);
        })} */}
      </div>
    );
  }
}
