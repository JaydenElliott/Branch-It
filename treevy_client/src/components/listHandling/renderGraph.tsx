import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

export default class RenderGraph extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.log(this.props.graphElem);
    return (
      <ReactFlow
        elements={this.props.graphElem}
        style={{ width: "100%", height: "100%" }}
        nodesDraggable={false}
        nodesConnectable={false}
      />
    );
  }
}
