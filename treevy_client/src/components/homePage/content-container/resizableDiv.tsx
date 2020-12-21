import React, { Component } from "react";
import "../../../componentStyles/testing/testingGrounds.css";

export default class ResizableDiv extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { grid1Width: 50, grid2Width: 50 };
  }

  increaseGrid1 = () => {
    if (this.state.grid2Width > 0) {
      this.setState({
        grid1Width: this.state.grid1Width + 10,
        grid2Width: this.state.grid2Width - 10,
      });
    }
  };
  decreaseGrid1 = () => {
    if (this.state.grid1Width > 0) {
      this.setState({
        grid1Width: this.state.grid1Width - 10,
        grid2Width: this.state.grid2Width + 10,
      });
    }
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
