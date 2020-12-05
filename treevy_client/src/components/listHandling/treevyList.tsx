import React, { ChangeEvent } from "react";
import { Component } from "react";

export interface ListState {
  // Local scope
  lists: TreevyList[];
  done: boolean;
  content: string;
  location: [number, number]; // [layer, item # in layer]
  parent?: TreevyList;
  tempString: string;
}

class TreevyList extends Component<any, ListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      lists: this.props.lists,
      done: this.props.done,
      content: this.props.content,
      location: this.props.location,
      parent: this.props.parent,
      tempString: "",
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      tempString: e.currentTarget.value,
    });
  };

  testingtesting = () => {};

  submitItem = (_e: any): void => {
    _e.preventDefault();
    if (this.state.tempString == "") {
      return;
    }

    // fix this later
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.tempString,
      location: [0, 0], // fix later
      parent: this.props.parent,
      tempString: "",
    };

    this.state.lists.push(new TreevyList(list));
    this.setState({
      tempString: "",
    });
  };
}

export default TreevyList;
