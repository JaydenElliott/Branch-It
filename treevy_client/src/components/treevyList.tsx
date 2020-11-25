import React, { ChangeEvent } from "react";
import { Component } from "react";
import "../components/test.css";

export interface ListState {
  // Local scope
  lists: TreevyList[];
  done: boolean;
  content: string;
  location: [number, number];
}

class TreevyList extends Component<any, ListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      lists: this.props.lists,
      done: this.props.done,
      content: this.props.content,
      location: this.props.location,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      content: e.currentTarget.value,
    });
  };

  submitItem = (_e: any): void => {
    _e.preventDefault();
    if (this.state.content == "") {
      return;
    }

    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.content,
      location: [0, 0], // fix later
    };

    this.state.lists.push(new TreevyList(list));
    this.setState({
      content: "",
    });
  };
}

export default TreevyList;
