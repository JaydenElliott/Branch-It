import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import TreevyList, { ListState } from "./components/treevyList";

interface AppState {
  // Local scope
  cstring: string;
  items: ListState[];
  // list: TreevyList;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      cstring: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.submitItem = this.submitItem.bind(this);
  }

  // Keyboard input field
  onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      cstring: e.currentTarget.value,
    });
    console.log(this.state);
  }

  // On 'enter' push string to state.
  submitItem(_e: any): void {
    _e.preventDefault();
    if (this.state.cstring == "") {
      return;
    }
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.cstring,
    };

    const updatedItems = [...this.state.items, list];
    this.setState({
      items: updatedItems,
      cstring: "",
    });
  }

  // Delete treevy list
  deleteList = (itemIndex: number) => {
    const updatedItems = this.state.items;
    updatedItems.splice(itemIndex, 1);
    this.setState({ items: updatedItems });
  };

  renderList = () => {
    return (
      <div id="listParent">
        {this.state.items.map((item, index) => (
          <TreevyList item={item} index={index} deleteList={this.deleteList} />
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
            value={this.state.cstring}
          />
          <button id="submitBtn" type="submit">
            {"Submit"}
          </button>
        </form>
        {this.renderList()}
      </div>
    );
  }
}

export default App;
