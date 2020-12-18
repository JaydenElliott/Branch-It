var GAP = 6;
var LEVEL_HEIGHT = 2;

class Node {
  constructor(task, width, ID) {
    this.task = task;
    this.children = [];
    this.level = 0;
    this.width = width;
    this.parental_node = undefined;
    this.ID = ID;
  }

  is_root() {
    return this.parental_node == undefined ? true : false;
  }

  append_node(new_node, index = undefined) {
    if (index == undefined) {
      index = this.children.length; // put it at end of list
    }
    this.children.splice(index, 0, new_node);
    new_node.parental_node = this;
    new_node.level = this.level + 1;
  }

  is_leave() {
    return this.children.length == 0 ? true : false;
  }

  compute_claimed_space() {
    if (this.children.length == 0) {
      // leaf node
      return this.width;
    } else {
      let res = 0;
      for (let i = 0; i < this.children.length; i++) {
        res += this.children[i].compute_claimed_space();
      }
      res += (this.children.length - 1) * GAP;
      return res;
    }
  }

  compute_coordinate() {
    if (this.is_root() == true) {
      return [0, 0];
    }

    let y_axis = this.level * LEVEL_HEIGHT;
    let located_at;
    let x_axis;

    for (let i = 0; i < this.parental_node.children.length; i++) {
      if (this.parental_node.children[i].ID == this.ID) {
        located_at = i;
        break;
      }
    }

    let x_axis_started_at =
      this.parental_node.compute_coordinate()[0] -
      this.parental_node.compute_claimed_space() / 2;
    if (located_at == 0) {
      x_axis = x_axis_started_at;
    } else if (located_at == this.parental_node.children.length - 1) {
      x_axis =
        this.parental_node.compute_coordinate()[0] +
        this.parental_node.compute_claimed_space() / 2;
    } else {
      x_axis = x_axis_started_at;
      for (let i = 0; i < located_at; i++) {
        x_axis += this.parental_node.children[i].compute_claimed_space();
        x_axis += GAP;
      }
      x_axis += this.compute_claimed_space() / 2;
    }

    return [x_axis, y_axis];
  }
}

module.exports = Node;
