import React, { Component } from "react";
import "../styles/component-styles/listboard.css";
import TreevyList, { ListState } from "./treevyList";

export default class ListBoard extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  renderTree = () => {
    for (let index = 0; index < this.props.lists.length; index++) {
      let list = this.props.lists[index];
      let layer = list.state.location[0];
      //   <div id="box"></div>;
      // Insert into "layer"
    }
  };

  /**
   *
   * @param layers maximum layer in the tree
   */
  testing = (layers: number) => {
    let dict: any[] = [];
    for (let i = 0; i <= layers; i++) {
      dict.push(["Layer " + i.toString(), []]);
    }

    for (let i = 0; i < this.props.lists.length; i++) {
      let list = this.props.lists[i];
      let layer = list.state.location[0];
      dict[layer][1].push(list);
    }
    return dict;
  };

  getMaxLayer = () => {
    let max = 0;
    for (let i = 0; i < this.props.lists.length; i++) {
      if (this.props.lists[i].state.location[0] > max) {
        max = this.props.lists[i].state.location[0];
      }
    }
    return max;
  };

  temp = () => {
    return (
      <div className="grid">
        <div className="layer">
          Layer1
          <div id="box" />
        </div>
        <div className="layer">
          Layer2 <div id="box" />
          <div id="box" />
        </div>
        <div className="layer">
          Layer3 <div id="box" />
          <div id="box" />
          <div id="box" />
        </div>
        <div className="layer">
          Layer3 <div id="box" />
          <div id="box" />
          <div id="box" />
        </div>
      </div>
    );
  };

  render() {
    const tomap = this.testing(this.getMaxLayer());
    return (
      <div>
        {tomap.map((value) => {
          return (
            <div className="layer">
              {value[1].map((list: any) => {
                return <div id="box">{list.state.content}</div>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
