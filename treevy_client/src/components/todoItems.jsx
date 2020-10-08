import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>{this.props.text} </h3>;
  }
}

export default TodoItem;
