// External Modules
import React, { Component } from "react";

import { connect } from "react-redux";

// Styling
import "./contentContainer.scss";

// Internal Components
import SideBar from "./side-bar/sideBar";
import ListNav from "./list-nav/listNav";
import ChildListNav from "./list-nav/childListNav";

class ContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  displayListItem = (list) => {
    return;
  };

  render() {
    return (
      <div className="content-container">
        <SideBar />

        {this.props.selectedList == undefined ? <ListNav /> : <ChildListNav />}

        {/* <div style={{ zIndex: -1 }}>
          {this.props.lists.map((list) => this.displayListItem(list))}
        </div> */}
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return { lists: state.user.lists, selectedList: state.user.selectedList };
};

export default connect(mapStateToProps, undefined)(ContentContainer);
