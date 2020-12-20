import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

const elements = [
  { id: "1", data: { label: "Parent" }, position: { x: 500, y: 150 } }, // node 1`
  { id: "2", data: { label: "First child" }, position: { x: 400, y: 250 } }, // node 2
  { id: "3", data: { label: "Second child" }, position: { x: 600, y: 250 } }, // node 2

  { id: "e1-2", source: "1", target: "2", animated: true }, // edge
  { id: "e1-3", source: "1", target: "3", animated: false }, // edge
];

const graphStyles = { width: "100%", height: "100%" };

export default class RenderGraph extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.log(this.props.graphElem);
    return (
      <ReactFlow
        elements={this.props.graphElem}
        style={graphStyles}
        nodesDraggable={false}
        nodesConnectable={false}
      />
    );
  }
}
