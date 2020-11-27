import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import TreevyList, { ListState } from "./components/treevyList";
import RenderList from "./components/renderList";
import ListBoard from "./components/listBoard";

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
  };

  // Keyboard Input Utility
  submitItem = (_e: any, layer = 1): void => {
    _e.preventDefault();
    if (this.state.listName == "") {
      return;
    }
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.listName,
      location: [layer, this.state.items.length + 1],
      tempString: "",
    };
    let newList = new TreevyList(list);
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

  /**
   * Iterates through app list and deletes all elements
   * to the right of @param list until it reaches an
   * element with the same layer as 'list'
   */
  deleteAll = (list: TreevyList) => {
    let listLayer = list.state.location[0];
  };

  /**
   * Takes child list submitted via genChildList and inserts it into
   * state.items at the appropriate location.
   *
   * @param childList
   * @param parentLocation
   */
  submitChildList = (
    childList: TreevyList,
    parentLocation: Array<number>
  ): void => {
    let parentIdx = null;
    let insertIdx = null;
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].state.location == parentLocation) {
        parentIdx = i;
      }
    }
    if (parentIdx == null) {
      throw "CHILD LIST INSERT CANNOT FIND PARENT";
    } else {
      let i = parentIdx + 1;
      while (
        i < this.state.items.length &&
        this.state.items[i].state.location[0] ===
          this.state.items[parentIdx].state.location[0] + 1
      ) {
        i += 1;
      }
      insertIdx = i;
      let updatedItems = this.state.items.slice();
      updatedItems.splice(insertIdx, 0, childList);
      this.setState({
        items: updatedItems,
      });
    }
  };

  renderList = () => {
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
        <div>
          {this.state.items.map((list, index) => (
            <RenderList
              onClickDel={this.deleteList}
              parent={list}
              submitChildList={this.submitChildList}
            />
          ))}
        </div>
      </div>
    );
  };

  renderListBoard = () => {
    return <ListBoard />;
  };

  render() {
    return (
      <div>
        <div>{this.renderList()}</div>
        {/* <div>{this.renderListBoard()}</div> */}
      </div>
    );
  }
}

export default App;
