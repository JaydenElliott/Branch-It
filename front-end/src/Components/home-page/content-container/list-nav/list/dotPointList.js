import React, { Component } from "react";
import TodoList from "../../../../list-handling/todoList";
import { selectList } from "../../../../../redux/actions/userActions";
import { v4 as uuidv4 } from 'uuid';

import "./dotPointList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons"; // prettier-ignore

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateGraphFlow } from "../../../../../redux/actions/userActions";

class DotPointList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemModalOpen: false,
      addListInput: "",
    };
  }

  componentDidMount = () => {
    // Graph self if root (so that there is a graph initially)
    if (this.props.selectedList === this.props.list) {
      // Graph root
      this.props.updateGraphFlow(this.props.graphFlow.concat(this.genGraph(this.props.list)));
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
      return graph;
    } else {
      list.children.forEach(child => {
        // Extend graph to include child
        graph = graph.concat(this.genGraph(child), {
          // Create line to child
          id: uuidv4(),
          source: list.reactFlow.id,
          target: child.reactFlow.id,
        });
      });
      return graph;
    }
  }

  addChildList = (e) => {
    e.preventDefault();
    this.props.list.addList(new TodoList(this.state.addListInput));
    this.props.updateGraphFlow(this.props.graphFlow.concat(this.genGraph(this.props.list)));

    // Reset input
    this.setState({
      addListInput: "",
    });
  };

  modalSwitch = () => {
    this.setState({
      itemModalOpen: !this.state.itemModalOpen,
    });
  };

  onInputChange = (e) => {
    this.setState({
      addListInput: e.currentTarget.value,
    });
  };

  renderItemModal = () => {
    return (
      <div className="item-modal-container">
        <button className="modal-item-close" onClick={this.modalSwitch}>
          &times;
        </button>
        <div className="item-modal-title">{this.props.list.listName}</div>
        <div className="item-modal-content">
          <div className="item-modal-content-title">Description:</div>
          <div className="item-modal-description"></div>
          <div className="item-modal-content-title">Add Child List:</div>
          <div className="item-modal-add-child">
            <form onSubmit={this.addChildList}>
              <input
                onChange={this.onInputChange}
                value={this.state.addListInput}
              />
              <button type="submit">
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ height: "100%", width: "100%" }}
                />
              </button>
            </form>
          </div>
          <div className="item-modal-remove-list">
            <div className="item-modal-content-title">Remove List</div>{" "}
            <button>
              <FontAwesomeIcon
                icon={faMinus}
                style={{ height: "100%", width: "100%" }}
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="dot-point-container">
          <div
            className="dot-point-dot"
            style={{
              marginLeft: (this.props.depth * 20).toString() + "px",
            }}
          >
            &#8226;
          </div>
          <div className="dot-point-title">{this.props.list.listName}</div>
          <div className="dot-point-more">
            <button onClick={this.modalSwitch}>
              <FontAwesomeIcon
                icon={faEllipsisV}
                style={{ height: "100%", width: "100%" }}
              />
            </button>
          </div>
          {this.state.itemModalOpen && this.renderItemModal()}
        </div>
        {this.props.list.children.map((todo) => {
          const key = uuidv4(); // To prevent no key warning/error
          return <DotPointList key={key} list={todo} depth={this.props.depth + 1} graphFlow={this.props.graphFlow} updateGraphFlow={this.props.updateGraphFlow}/>;
        })}
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return { graphFlow: state.user.graphFlow, selectedList: state.user.selectedList };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      //   updateLists: updateLists,
      selectList,
      updateGraphFlow,
    },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(DotPointList);
