/**
 * Class object to store list attributes
 */

export default class TodoList {
  done = false;
  listName = "";
  children = [];
  
  constructor(listName, done = false, children = []) {
    this.listName = listName;
    this.done = done;
    this.children = children;
  }
}