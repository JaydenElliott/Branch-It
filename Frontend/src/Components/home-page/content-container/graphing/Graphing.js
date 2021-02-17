// External Moudles
import React, { Component } from "react";
import ReactFlow, { useStoreState } from "react-flow-renderer";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updatePosition } from "../../../../redux/actions/userActions";

// Styling
import "./Graphing.scss";

class Graphing extends Component {
  constructor(props) {
    super(props);
  }

  // When graph "node" moves, it updates it's
  // position in redux's user graphFlow state
  onNodeDragStop = (node) => {
    this.props.updatePosition(node.id, node.position);
  };

  render() {
    return (
      <div className="graph-container">
        <ReactFlow
          elements={this.props.graphFlow}
          style={{ width: "100%", height: "100%" }}
          nodesDraggable={true}
          nodesConnectable={false}
          onNodeDragStop={this.onNodeDragStop}
        >
          {/* TODO: fix so that we can store the positions of the nodes */}
          {/* <NodesDebugger updateGraphFlow={this.props.updateGraphFlow}/> */}
        </ReactFlow>
      </div>
    );
  }
}

const NodesDebugger = (props) => {
  const nodes = useStoreState((state) => state.nodes);
  console.log(nodes);
  props.updateGraphFlow(nodes);
  return null;
};

// Redux mappings to props
const mapStateToProps = (state) => {
  return { graphFlow: state.user.graphFlow };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatePosition,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Graphing);
