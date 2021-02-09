/**
 * Class object to store list attributes
 */
import { v4 as uuidv4 } from "uuid";

export default class TodoList {
  listName = "";
  done = false;
  children = [];

  // ReactFlow
  reactFlow = { id: undefined, data: { label: "" }, position: { x: 0, y: 0 } };

  constructor(
    listName,
    done = false,
    children = [],
    position = { x: 0, y: 0 },
    id = undefined
  ) {
    this.listName = listName;
    this.done = done;
    this.children = children;

    // ReactFlow
    this.reactFlow = {
      id: !id ? "" + uuidv4() : id, // To make into string
      data: { label: listName },
      position: position,
    };
  }

  /**
   * Adds a child list to the current list
   * @param newList to add
   */
  addList = (newList) => {
    this.children = [...this.children, newList];
  };
}
