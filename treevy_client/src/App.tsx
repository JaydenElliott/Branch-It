import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import TreevyList, { ListState } from "./components/treevyList";
import Modal from "react-modal";
import RenderList from "./components/renderList";

interface AppState {
  listName: string;
  items: TreevyList[];
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      listName: "",
      items: [],
    };
  }

  // Keyboard Input Utility
  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      listName: e.currentTarget.value,
    });
    console.log(this.state);
  };

  // Keyboard Input Utility
  submitItem = (_e: any): void => {
    _e.preventDefault();
    if (this.state.listName == "") {
      return;
    }
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.listName,
      location: [1, this.state.items.length + 1], // app level always parses layer 1
    };
    let newList = new TreevyList(list);
    console.log("hello");
    const updatedItems = [...this.state.items, newList];
    this.setState({
      items: updatedItems,
      listName: "",
    });
  };

  deleteList = (itemIndex: string) => {
    var index = parseInt(itemIndex);
    const updatedItems = this.state.items;
    updatedItems.splice(index, 1);
    this.setState({ items: updatedItems });
  };

  // Render method
  renderList = () => {
    return (
      <div>
        {this.state.items.map((list, _e) => (
          <RenderList
            content={list.state.content}
            childLists={list.state.lists}
            onClickDel={this.deleteList}
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="center">
        <h2>To-Do List</h2>
        <form onSubmit={this.submitItem}>
          <input
            className="new-todo"
            type="text"
            onChange={this.onInputChange}
            value={this.state.listName}
          />
          <button id="submitBtn" type="submit"></button>
        </form>
        {this.renderList()}
      </div>
    );
  }
}

export default App;

// 1st: create button on treevy list that renders pop up with input
// - need to do this last
// 2nd: if list is created through initial app interface - give it layer 1
// 3rd: if list is created through pop up interface - give it layer parent + 1
//              - with item numeber, length + 1 of list[]
