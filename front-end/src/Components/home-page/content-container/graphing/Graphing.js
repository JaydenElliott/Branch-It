import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

// Redux
import { connect } from "react-redux";

import "./Graphing.scss";

class Graphing extends Component {
  // Component state
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="graph-container">
        <ReactFlow
          elements={this.props.graphFlow}
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
  return { graphFlow: state.user.graphFlow };
};

export default connect(mapStateToProps)(Graphing);
