import React from "react";
import { Component } from "react";
import "../components/renderList.css";

/**
 * Class to create beatifully rendered lists
 */
export default class RenderList extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="listChild" id={"arranged"}>
        <div className="listItem">
          <span>&#8226;</span>
          {this.props.content}
        </div>

        <div className="AddButton" id={"goToLeft"}>
          <button
            type="button"
            className="close"
            onClick={this.props.onClickAdd} // add later
          >
            +
          </button>
        </div>
        <div className="RemoveButton" id={"goToLeft"}>
          <button
            type="button"
            className="close"
            onClick={this.props.onClickDel}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}
