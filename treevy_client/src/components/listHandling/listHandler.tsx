import React, { ChangeEvent } from "react";
import { Component } from "react";

// Dependent files
import RenderList from "./renderList";
import TreevyList, { ListState } from "./treevyList";
import RenderGraph from "./renderGraph";

// Styling
import "../../componentStyles/listHandling/listHandler.css";

var WIDTH = 2;
var root_coordinate = [400, 50];
var xscale = 40;
var yscale = 60;

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
  coordinates: root_coordinate,
  width: WIDTH,
  parent: undefined,
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
  submitItem = async (_e: any, layer = 0) => {
    _e.preventDefault();
    if (this.state.listName == "") {
      return;
    }

    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.listName,
      location: [layer, this.state.items.length + 1],
      coordinates: [-1, -1],
      width: WIDTH,
      parent: this.state.items[0],
    };
    let newList = new TreevyList(list);
    newList.parent.lists.push(newList);
    let updatedItems = [...this.state.items, newList];
    await this._setItemStateAsync(updatedItems);
    this.calculateCoordinates();
    await this._setItemStateAsync(updatedItems);
  };

  /**
   * To prevent asynchronous setState
   */
  _setItemStateAsync = (updatedItems: any) => {
    return new Promise((resolve) => {
      this.setState({
        items: updatedItems,
        listName: "",
      });
      this.setState(resolve);
    });
  };

  /**
   * Iteratively deletes all child items of the provided index as well as the index item itself.
   *
   * @param index of item to be deleted
   */
  deleteList = (index: number) => {
    // To change the list in an immutable fashion, make a new list.
    let updatedItems: TreevyList[] = this.state.items.slice();

    // Delete all child items iteratively
    const thisLocation = this.state.items[index].location;

    // Delete from parent list
    updatedItems[index].parent.lists = updatedItems[index].parent.lists.filter(
      (list: TreevyList) => list.location !== thisLocation
    );

    // Delete this item
    updatedItems.splice(index, 1);

    // Delete children of this item.
    while (
      index < updatedItems.length &&
      updatedItems[index].location[0] > thisLocation[0]
    ) {
      updatedItems.splice(index, 1);
    }

    // Update the state
    this.setState({ items: updatedItems });
  };

  /**
   * Takes child list submitted via genChildList and inserts it into
   * state.items at the appropriate location.
   *
   * @param childList
   * @param parentLocation
   */
  submitChildList = async (
    childList: TreevyList,
    parentLocation: Array<number>
  ) => {
    let parentIdx: any = null;
    let insertIdx: any = null;
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
      await this._setItemStateAsync(updatedItems);
      this.calculateCoordinates();
      await this._setItemStateAsync(updatedItems);
    }
  };

  calculateCoordinates = () => {
    for (let i = 0; i < this.state.items.length; i++) {
      if (i == 0) {
        continue;
      }
      let newCoords = this.coord_adapter(
        root_coordinate,
        this.state.items[i].compute_coordinate(),
        xscale,
        yscale
      );
      this.state.items[i].coordinates = newCoords;
    }
  };

  coord_adapter = (
    root_coordinate: any,
    coordinate: any,
    xscale: number,
    yscale: number
  ) => {
    return [
      root_coordinate[0] + coordinate[0] * xscale,
      root_coordinate[1] + coordinate[1] * yscale,
    ];
  };

  getFlowJson = () => {
    let newGraphElements: any = [];
    if (this.state.items.length > 0) {
      for (let i = 1; i < this.state.items.length; i++) {
        let item = this.state.items[i];
        let newElement = {
          id: item.location.toString(),
          data: { label: item.content },
          position: { x: item.coordinates[0], y: item.coordinates[1] },
        };
        newGraphElements.push(newElement);
      }
    }
    return newGraphElements;
  };

  render() {
    return (
      <div className="listHandler-container">
        <div className="list-container">
          <form onSubmit={this.submitItem}>
            <input
              className="new-todo"
              type="text"
              onChange={this.onInputChange}
              value={this.state.listName}
            />
          </form>
          <div>
            {this.state.items.map((list: any, index: number) => (
              <RenderList
                onClickDel={() => this.deleteList(index)}
                parent={list}
                submitChildList={this.submitChildList}
                width={WIDTH}
                itemCount={this.state.items.length}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
