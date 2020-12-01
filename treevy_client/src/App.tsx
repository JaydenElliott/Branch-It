import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import TreevyList, { ListState } from "./components/treevyList";
import RenderList from "./components/renderList";
import ListBoard from "./components/listBoard";
import HomePage from "./components/homePage";
import WelcomePage from "./components/welcomePage";
import SignUpPage from "./components/signupPage";
import TestingGrounds from "./components/testingGrounds";
import axios from "axios";

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
  submitItem = (_e: any, layer = 0): void => {
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

  /**
   * Recursively deletes all child items of the provided index as well as the index item itself.
   *
   * @param index of item to be deleted
   */
  deleteList = (index: number) => {
    // Delete all child items and their childern recusively
    const thisLocation = this.state.items[index].state.location; // Current list location
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].state.parent?.state.location === thisLocation) {
        this.deleteList(i);
        i = 0; // Resets search to account for change in list
      }
    }

    // Delete this item
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
   * Gets number of layers
   */
  maxLayers = () => {
    let max = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].state.location[0] > max) {
        max = this.state.items[i].state.location[0];
      }
    }
    return max;
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

  testFlask = () => {
    axios
      .post("http://0.0.0.0:5000/api/v1/login", {
        data: "Treevy is awesome.",
      })
      .then((res) => {
        console.log(res);
      });
  };

  renderList = () => {
    return (
      <div className="center">
        <button onClick={this.testFlask}> Olala</button>
        <h2>To-Do List</h2>
        <form onSubmit={this.submitItem}>
          <input
            className="new-todo"
            type="text"
            onChange={this.onInputChange}
            value={this.state.listName}
          />
          <button id="submitBtn" type="submit" />
        </form>
        <div>
          {this.state.items.map((list, index) => (
            <RenderList
              onClickDel={() => this.deleteList(index)}
              parent={list}
              submitChildList={this.submitChildList}
            />
          ))}
        </div>
      </div>
    );
  };

  renderListBoard = () => {
    return <ListBoard lists={this.state.items} maxLayer={this.maxLayers()} />;
  };

  render() {
    return (
      <div className="maindiv">
        {/* <TestingGrounds /> */}
        <HomePage toDoLists={["Frontend", "Backend"]} />
        {/* <WelcomePage /> */}
        {/* {this.renderList()} */}
        {/* {this.renderListBoard()} */}
        {/* <SignUpPage /> */}
      </div>
    );
  }
}

export default App;
