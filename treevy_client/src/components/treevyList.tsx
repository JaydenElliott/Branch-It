import React from "react";
import { Component } from "react";
// import { AppState } from "../App";

export interface TreevyModel {
  items: Array<string>;
}
class TreevyList extends Component<TreevyModel> {
  constructor(props: TreevyModel) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.items.map((v, _) => {
            return <li>{v}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default TreevyList;
