/**
 * Class is used to store the root properties of a to-do list.
 * Using this, lists can be switched between.
 */
export default class ListContainer {
  name = "";
  items = [];
  flowJson = [];
  done = false;

  constructor(name, items, flowJson, done = false) {
    this.name = name;
    this.items = items;
    this.flowJson = flowJson;
    this.done = done;
  }
}
