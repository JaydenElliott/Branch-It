// External Modules
import React, { Component } from "react";

import { connect } from "react-redux";

// Styling
import "./contentContainer.scss";

// Internal Components
import SideBar from "./side-bar/sideBar";
import ListNav from "./list-nav/listNav";
import ChildListNav from "./list-nav/childListNav";
import Graphing from "./graphing/Graphing";

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
        <Graphing />
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return {
    navPage: state.navPage,
    lists: state.user.lists,
    selectedList: state.user.selectedList,
  };
};

export default connect(mapStateToProps, undefined)(ContentContainer);
