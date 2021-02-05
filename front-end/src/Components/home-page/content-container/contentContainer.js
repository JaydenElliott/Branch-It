// External Modules
import React, { Component } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";

// Styling
import "./contentContainer.scss";

// Internal Components
import SideBar from "./side-bar/sideBar";
import ListNav from "./list-nav/listNav";

class ContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  displayListItem = (list) => {
    return (
      <Draggable
        axis="both"
        defaultPosition={{x: 0, y: 0}}    //TODO: replace with attribute held by the list itself (list item will hold coordinate).
        position={null}
        scale={1}
      >
        <div className="item">{list.listName}</div>
      </Draggable>
    );
  }

  render() {
    return (
      <div className="content-container">
        <SideBar />
        <ListNav />
        <div style={{zIndex: -1}}>
          {this.props.lists.map(list => this.displayListItem(list))}
        </div>
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return { lists: state.user.lists };
};

export default connect(mapStateToProps, undefined)(ContentContainer);
