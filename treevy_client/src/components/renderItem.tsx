import React from "react";
import { Component } from "react";

export default class RenderList extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.content}
          <button
            type="button"
            className="close"
            onClick={this.props.onClickDel}
          >
            &times;
          </button>
        </ul>
      </div>
    );
  }
}
