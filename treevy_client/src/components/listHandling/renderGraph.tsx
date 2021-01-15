import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

// Redux
import { connect } from "react-redux";

class RenderGraph extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ReactFlow
        elements={this.props.graphElem || (this.props.selected ? this.props.selected.flowJson : [])} // Will render in order of: provided prop, redux selected, nothing
        style={{ width: "100%", height: "100%" }}
        nodesDraggable={false}
        nodesConnectable={false}
        defaultPosition={this.props.renderPosition}
      />
    );
  }
}

// Redux mapping to props
const mapStatesToProps = (state: any) => {
  const { selected, lists } = state.listsReducer;
  return {
    selected,
    lists,
  };
};

export default connect(mapStatesToProps, null)(RenderGraph); // No dispatches necessary
