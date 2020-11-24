import React, { ChangeEvent } from "react";
import { Component } from "react";
import "../components/test.css";
// import { AppState } from "../App";
import RenderList from "../components/renderList";

/**
 * All lists and sublists contain the ListState interface
 * To be transformed into the class state through props
 */
export interface ListState {
  // Local scope
  lists: TreevyList[];
  done: boolean;
  content: string;
}

class TreevyList extends Component<any, ListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      lists: this.props.item.lists,
      done: this.props.item.done,
      content: this.props.item.content,
    };
  }

  /**
   * Keyboard input handler
   */
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      content: e.currentTarget.value,
    });
  };

  /**
   * Keyboard submit method
   */
  submitItem = (_e: any): void => {
    _e.preventDefault();
    if (this.state.content == "") {
      return;
    }

    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.content,
    };

    this.state.lists.push(new TreevyList(list));
    this.setState({
      content: "",
    });
  };

  /**
   * Delete Item using "button"
   */
  deleteItem(e: number) {
    this.props.deleteList(e);
  }

  /**
   * Utility method for deleteItem()
   * Get index for deleteItem Method
   */
  onClickClose = () => {
    var index = parseInt(this.props.index);
    this.deleteItem(index);
  };

  /**
   * Button method to add new input field
   */
  onClickAdd = () => {
    const list: ListState = {
      lists: [],
      done: false,
      content: "",
    };
    let a = new TreevyList(list);

    this.state.lists.push(a);
  };

  /**
   * Move this to app level
   */
  render() {
    return (
      <RenderList
        content={this.state.content}
        childLists={this.state.lists}
        onClickDel={this.onClickClose}
      />
    );
  }
}

export default TreevyList;
