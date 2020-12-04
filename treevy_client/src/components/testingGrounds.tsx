import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

const elements = [
  { id: "1", data: { label: "Parent" }, position: { x: 500, y: 150 } }, // node 1`
  { id: "2", data: { label: "First child" }, position: { x: 400, y: 250 } }, // node 2
  { id: "3", data: { label: "Second child" }, position: { x: 600, y: 250 } }, // node 2

  { id: "e1-2", source: "1", target: "2", animated: true }, // edge
  { id: "e1-3", source: "1", target: "3", animated: false }, // edge
];

const graphStyles = { width: "100%", height: "500px" };

const BasicGraph = () => (
  <ReactFlow
    elements={elements}
    style={graphStyles}
    nodesDraggable={false}
    nodesConnectable={false}
  />
);

export default class TestingGrounds extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BasicGraph />
      </div>
    );
  }
}
