import React, { Component } from "react";

// Styling
import "./parentList.scss";

class ParentList extends Component {
  state = {
    newListName: "",
  };

  render() {
    return (
      <button className="parent-list-container">
        <input className="parent-list-tickbox" type="checkbox" />
        <div className="parent-list-title"> {this.props.listname}</div>
      </button>
    );
  }
}

export default ParentList;
