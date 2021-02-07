import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Graphing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="graph-container">
        <ReactFlow
          elements={this.props.graphJSON}
          style={{ width: "100%", height: "100%" }}
          nodesDraggable={true}
          nodesConnectable={false}
        />
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return { navPage: state.navPage, user: state.user };
};

export default connect(mapStateToProps)(Graphing);
