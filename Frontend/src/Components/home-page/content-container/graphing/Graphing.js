import React, { Component } from "react";
import ReactFlow, { useStoreState } from "react-flow-renderer";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateGraphFlow } from "../../../../redux/actions/userActions";

import "./Graphing.scss";

class Graphing extends Component {
  // Component state
  constructor(props) {
    super(props);
  }

  onNodeDragStop = (event, node) => {
    console.log("node", node);
    console.log("original", this.props.graphFlow);

    // here we use node to update reactFlow
    let newGraphFlow = this.props.graphFlow;

    for (let i = 0; i < newGraphFlow.length; i++) {
      if (newGraphFlow[i].id == node.id) {
        newGraphFlow.splice(i, 1);
        newGraphFlow.push(node);
        this.props.updateGraphFlow(newGraphFlow);
      }
    }
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
      updateGraphFlow,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Graphing);
