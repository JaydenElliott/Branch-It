import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

// Redux
import { connect } from "react-redux";

import './Graphing.scss';

class Graphing extends Component {
  // Component state
  constructor(props) {
    super(props);
    this.state = {
      graphJSON: this.genGraph(),
    }
  }

  /**
   * Generates graph recursively using TodoList react flow information.
   * @param list to make into graph. Children will be graphed as well recursively and linked.
   * @returns graph list of objects for ReactFlow
   */
  genGraph = (list) => {
    // If list is undefined, stop
    if (!list) {
      return [];
    }

    // List to store graph objects
    // Add self
    let graph = [list.reactFlow];

    // Base case (no children)
    if (list.children.length === 0) {
      // console.log('here we are Jayden :D')
      console.log(list);
      return graph;
    } else {
      // list.children.forEach(child => console.log(child));
      list.children.forEach(child => graph = [...graph, this.genGraph(child)]);
      return graph;
    }
  }

  render() {
    const test = [...this.genGraph(this.props.selectedList)];
    console.log(test);
    return (
      <div className="graph-container">
        <ReactFlow
          elements={test}
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
  return { selectedList: state.user.selectedList };
};

export default connect(mapStateToProps)(Graphing);
