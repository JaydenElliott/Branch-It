import React, { ChangeEvent, Component } from "react";
import EcoIcon from "@material-ui/icons/Eco";
import Button from "@material-ui/core/Button";
import TreevyList, { ListState } from "./treevyList";

var GAP = 6;
var LEVEL_HEIGHT = 2;

export default class Node extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      task: props.task,
      children: [],
      level: 0,
      width: props.width,
      parental_node: null,
    };
  }

  is_root = () => {
    return this.state.parental_node === null ? true : false;
  };

  append_node = (new_node: Node, index = null) => {
    if (index === null) {
      index = this.state.children.length; // put it at end of list
    }
    let updatedChildren = this.state.children.slice();
    updatedChildren.splice(index, 0, new_node);
    this.setState({
      children: updatedChildren,
    });
    new_node.setState({
      parental_node: this,
      level: this.state.level + 1,
    });
  };

  append_to = (parental_node: Node, index = null) => {
    if (index === null) {
      index = parental_node.state.children.length;
    }
    let updatedParentalChildren = parental_node.state.children.slice();
    updatedParentalChildren.splice(index, 0, this);

    parental_node.setState({
      children: updatedParentalChildren,
    });

    this.setState({
      level: parental_node.state.level + 1,
    });
  };

  is_leave = () => {
    return this.state.children.length == 0 ? true : false;
  };

  compute_claimed_space = () => {
    if (this.is_leave() == true) {
      return this.state.width;
    } else {
      let res = 0;
      for (let i = 0; i < this.state.children.length; i++) {
        res += this.state.children[i].compute_claimed_space();
      }
      res += (this.state.children.length - 1) * GAP;
      return res;
    }
  };

  compute_coordinate = () => {
    if (this.is_root() == true) {
      return [0, 0];
    }

    let y_axis = this.state.level * LEVEL_HEIGHT;
    let located_at;
    let x_axis;

    // THIS MAY BE A PROBLEM - NOT SURE IF THE EQUALITY WORKS
    for (let i = 0; i < this.state.parental_node.state.children.length; i++) {
      if (this.state.parental_node.state.children[i] === this) {
        located_at = i;
        return i;
      }
    }

    let x_axis_started_at =
      this.state.parental_node.compute_coordinate()[0] -
      this.state.parental_node.compute_claimed_space() / 2;

    if (located_at == 0) {
      x_axis = x_axis_started_at;
    } else if (
      located_at ==
      this.state.parental_node.state.children.length - 1
    ) {
      x_axis =
        this.state.parental_node.compute_coordinate()[0] +
        this.state.parental_node.compute_coordinate() / 2;
    } else {
      x_axis = x_axis_started_at;
      for (let i = 0; i < located_at; i++) {
        x_axis +=
          this.state.parental_node.compute_coordinate[0] +
          this.state.parental_node.compute_claimed_space / 2;
        x_axis += GAP;
      }
      x_axis += this.compute_claimed_space() / 2;
    }
    return [x_axis, y_axis];
  };

  coord_adapter = (
    root_coordinate: any,
    coordinate: any,
    xscale: any,
    yscale: any
  ) => {
    return [
      root_coordinate[0] + coordinate[0] * xscale,
      root_coordinate[1] + coordinate[1] * yscale,
    ];
  };
}
