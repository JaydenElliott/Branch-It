import React, { ChangeEvent } from "react";
import { Component } from "react";

export default class TreeHandler extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  coord_adapter = (
    root_coordinate: any,
    coordinate: any,
    xscale: number,
    yscale: any
  ) => {
    return [
      root_coordinate[0] + coordinate[0] * xscale,
      root_coordinate[1] + coordinate[1] * yscale,
    ];
  };

  getCoordinates = () => {
    // starts at root and reassigns all coordinates
  };

  getFlowAttributes = () => {};
}
