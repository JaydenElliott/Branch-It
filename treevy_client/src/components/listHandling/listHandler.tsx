import React, { ChangeEvent } from "react";
import { Component } from "react";
import RenderList from "./renderList";
import TreevyList, { ListState } from "./treevyList";

var WIDTH = 2;

/**
 * An invisible node is required for the graph generation
 * All the actual "root" lists need a parent to align themselves with
 *
 */
const invisibleRootNodeAttributes: ListState = {
  lists: [],
  done: false,
  content: "",
  location: [0, 0],
  coordinates: [0, 0],
  width: WIDTH,
};

var rootNode = new TreevyList(invisibleRootNodeAttributes);

export interface ListHandlerState {
  listName: string;
  items: TreevyList[];
}

export default class ListHandler extends Component<any, ListHandlerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      listName: props.listName || "",
      items: [rootNode],
    };
  }

  // Parent Keyboard Input Utility
  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      listName: e.currentTarget.value,
    });
  };

  // Keyboard Input Utility for submitting "root" lists
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
      coordinates: [0, 0],
      width: WIDTH,
      parent: this.state.items[0],
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
    const thisLocation = this.state.items[index].location; // Current list location
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].parent?.location === thisLocation) {
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
      if (this.state.items[i].location == parentLocation) {
        parentIdx = i;
      }
    }
    if (parentIdx == null) {
      throw "CHILD LIST INSERT CANNOT FIND PARENT";
    } else {
      let i = parentIdx + 1;
      while (
        i < this.state.items.length &&
        this.state.items[i].location[0] ===
          this.state.items[parentIdx].location[0] + 1
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

  render() {
    return (
      <div className="maindiv" style={{ width: "100%", height: "100%" }}>
        <div className="center">
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
            {this.state.items.map((list: any, index: number) => (
              <RenderList
                onClickDel={() => this.deleteList(index)}
                parent={list}
                submitChildList={this.submitChildList}
                width={WIDTH}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
