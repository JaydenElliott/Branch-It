import React, { ChangeEvent } from "react";
import { Component } from "react";
// import { AppState } from "../App";

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

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      content: e.currentTarget.value,
    });
  };

  removeItem(e: string) {
    this.props.deleteList(e);
  }

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
   * Renders all the child lists 'content'
   */
  renderChildList = () => {
    let itemList = [];
    for (let i = 0; i < this.state.lists.length; i++) {
      itemList.push(<li>{this.state.lists[i].state.content}</li>);
    }
    return itemList;
  };

  // GOAL: App calls each treevy list. Each treevy list renders itself and has a seperate method called "render children"
  // Render children : renders children if there are any

  render() {
    return (
      <div>
        <li>{this.state.content}</li>
      </div>
    );
  }
}

{
  /* Submit Child List Method */
}
{
  /* <form onSubmit={this.submitItem}> 
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleInputChange}
          ></input>
        </form> */
}
export default TreevyList;
