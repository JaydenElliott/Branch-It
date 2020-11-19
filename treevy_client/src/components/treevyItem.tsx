import React from "react";
import { Component } from "react";

export interface ItemState {
  done: boolean;
  content: string
}

class TreevyItem extends Component<any, ItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      done: false,
      content: "",
    };
  }

  render() {
    return (
        <div />
    );
  }
}

export default TreevyItem;