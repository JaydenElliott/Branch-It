import React, { ChangeEvent } from "react";
import { Component } from "react";
import RenderList from "./renderList";
import TreevyList, { ListState } from "./treevyList";

var WIDTH = 2;
const rootParameters: ListState = {
  lists: [],
  done: false,
  content: "Welcome to root list",
  layer: 0,
  ID: 0,
  width: WIDTH,
  parent: undefined,
};
var rootList = new TreevyList(rootParameters);

export interface ListHandlerState {
  listName: string;
  items: TreevyList[];
}

export default class ListHandler extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      listName: this.props.listName || "",
      idCounter: 0,
      rootNode: rootList,
    };
  }

  incrementCounter = () => {
    this.setState({
      idCounter: this.state.idCounter + 1,
    });
  };

  render() {
    return (
      <div>
        <RenderList
          list={this.state.rootNode}
          idCounter={this.state.idCounter}
          incrementCounter={this.incrementCounter}
          width={WIDTH}
        />
      </div>
    );
  }
}
