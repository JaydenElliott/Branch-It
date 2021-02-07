/**
 * Class object to store list attributes
 */

export default class TodoList {
  done = false;
  listName = "";
  children = [];
  coordinates = { x: 0, y: 0 };

  constructor(
    listName,
    done = false,
    children = [],
    coordinates = { x: 0, y: 0 }
  ) {
    this.listName = listName;
    this.done = done;
    this.children = children;
    this.coordinates = coordinates;
  }

  addList = (newList) => {
    this.children = [...this.children, newList];
  };
}
