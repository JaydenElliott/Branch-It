/**
 * Class object to store list attributes
 */

var GAP = 6;
var LEVEL_HEIGHT = 2;

export interface ListState {
  // Local scope
  lists: TreevyList[];
  done: boolean;
  content: string;
  location: [number, number]; // [layer, item # in layer]
  coordinates: any; // x,y
  parent?: TreevyList;
  width: number;
}
class TreevyList {
  constructor(listDetails: ListState) {
    this.lists = listDetails.lists;
    this.done = listDetails.done;
    this.content = listDetails.content;
    this.location = listDetails.location;
    this.coordinates = listDetails.coordinates;
    this.parent = listDetails.parent;
    this.tempString = "";
    this.width = listDetails.width;
  }
  lists: any;
  done: boolean;
  content: string;
  location: any;
  coordinates: any;
  parent: any;
  tempString: string;
  width: number;

  is_root() {
    return this.parent == undefined ? true : false;
  }

  append_node(new_node: TreevyList, index = undefined) {
    if (index == undefined) {
      index = this.lists.length; // put it at end of list
    }
    this.lists.splice(index, 0, new_node);
    new_node.parent = this;
    new_node.location[0] = this.location[0] + 1;
  }

  is_leaf() {
    return this.lists.length == 0 ? true : false;
  }

  compute_claimed_space() {
    if (this.lists.length == 0) {
      // leaf node
      return this.width;
    } else {
      let res = 0;
      for (let i = 0; i < this.lists.length; i++) {
        res += this.lists[i].compute_claimed_space();
      }
      res += (this.lists.length - 1) * GAP;
      return res;
    }
  }

  compute_coordinate() {
    if (this.is_root() == true) {
      return [0, 0];
    }

    let y_axis = this.location[0] * LEVEL_HEIGHT;
    let located_at = 0;
    let x_axis;

    for (let i = 0; i < this.parent.lists.length; i++) {
      if (this.parent.lists[i].location == this.location) {
        located_at = i;
        break;
      }
    }

    let x_axis_started_at;
    x_axis_started_at =
      this.parent.compute_coordinate()[0] -
      this.parent.compute_claimed_space() / 2;
    if (located_at == 0) {
      x_axis = x_axis_started_at;
    } else if (located_at == this.parent.lists.length - 1) {
      x_axis =
        this.parent.compute_coordinate()[0] +
        this.parent.compute_claimed_space() / 2;
    } else {
      x_axis = x_axis_started_at;
      for (let i = 0; i < located_at; i++) {
        x_axis += this.parent.lists[i].compute_claimed_space();
        x_axis += GAP;
      }
      x_axis += this.compute_claimed_space() / 2;
    }

    return [x_axis, y_axis];
  }
}

export default TreevyList;
