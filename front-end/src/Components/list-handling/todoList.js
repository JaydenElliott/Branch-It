/**
 * Class object to store list attributes
 */
import { v4 as uuidv4 } from 'uuid';

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
    position = {x: 0, y: 0},
    id = undefined,
  ) {
    this.listName = listName;
    this.done = done;
    this.children = children;
    
    // ReactFlow
    this.reactFlow = {
      id: !id ? '' + uuidv4() : id,  // To make into string
      data: { label: listName },
      position: position
    };
  }

  /**
   * Recursively adds a new list to the list with the given id.
   * Is Immutable, does not change self, instead returns newly created list.
   * @param id of list to add to
   * @param newList to add
   * @returns Newly created list with new child placed correctly.
   */
  addList = (newList) => {
    this.children = [...this.children, newList];

    // Immutable approach (requires id input)
    // Base case
    // if (id === this.reactFlow.id) {
    //   return new TodoList(this.listName, this.done, [...this.children, newList], this.reactFlow.position, this.reactFlow.id);
    // } else if (id !== this.reactFlow.id && this.children.length === 0) {
    //   // Incorrect path
    //   return this;
    // } else {
    //   // Recursive step
    //   for (let i = 0; i < this.children.length; i++) {
    //     this.children[i] = this.children.addList(id, newList);
    //   }
    //   return this;
    // }
  };
}
