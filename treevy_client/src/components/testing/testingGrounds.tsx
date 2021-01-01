import React, { Component } from "react";
import "../../componentStyles/testing/testingGrounds.css";

const elements = [
  { id: "1", data: { label: "Parent" }, position: { x: 500, y: 150 } }, // node 1`
  { id: "2", data: { label: "First child" }, position: { x: 400, y: 250 } }, // node 2
  { id: "3", data: { label: "Second child" }, position: { x: 600, y: 250 } }, // node 2

  { id: "e1-2", source: "1", target: "2", animated: true }, // edge
  { id: "e1-3", source: "1", target: "3", animated: false }, // edge
];

export default class TestingGrounds extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { grid1Width: 50, grid2Width: 50 };
  }

  increaseGrid1 = () => {
    this.setState({
      grid1Width: this.state.grid1Width + 10,
      grid2Width: this.state.grid2Width - 10,
    });
  };
  decreaseGrid1 = () => {
    this.setState({
      grid1Width: this.state.grid1Width - 10,
      grid2Width: this.state.grid2Width + 10,
    });
  };

  stateToString = () => {
    let newString = "";
    newString += this.state.grid1Width + "% " + this.state.grid2Width + "%";
    return newString;
  };

  render() {
    return (
      <div className="grid-container1">
        <div className="button">
          <button onClick={this.increaseGrid1}>Increase Grid 1</button>
          <button onClick={this.decreaseGrid1}>Decrease Grid 1</button>
        </div>
        <div
          className="grid-container2"
          style={{ gridTemplateColumns: this.stateToString() }}
        >
          <div className="grid1">content1</div>
          <div className="grid2">content2</div>
        </div>
      </div>
    );
  }
}
