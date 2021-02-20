/**
 * Class object to store list attributes
 */
import { v4 as uuidv4 } from "uuid";

export default class TodoList {
  listName = "";
  done = false;
  children = [];

  // ReactFlow
  reactFlow = {
    id: undefined,
    data: { label: "" },
    position: { x: 0, y: 0 },
  };

  constructor(
    listName,
    position = { x: 400, y: 100 },
    depth,
    done = false,
    children = [],
    id = undefined
  ) {
    this.listName = listName;
    this.done = done;
    this.children = children;
    this.position = position;
    this.depth = depth;

    // ReactFlow
    this.reactFlow = {
      id: !id ? "" + uuidv4() : id, // To make into string
      data: { label: listName },
      position: position,
    };
  }
}