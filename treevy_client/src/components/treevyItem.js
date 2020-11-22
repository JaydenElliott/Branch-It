import React, { Component } from "react";

export default class TodoItem extends Component {
  render() {
    const { title } = this.props;
    return (
      <li>
        <div>
          <h6>{title}</h6>
        </div>
      </li>
    );
  }
}
