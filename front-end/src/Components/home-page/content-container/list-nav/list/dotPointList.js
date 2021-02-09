import React, { Component } from "react";
import TodoList from "../../../../list-handling/todoList";
import { selectList } from "../../../../../redux/actions/userActions";
import { v4 as uuidv4 } from "uuid";

import "./dotPointList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons"; // prettier-ignore

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateGraphFlow, deleteList, updateLists } from "../../../../../redux/actions/userActions"; // prettier-ignore

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
      this.props.updateGraphFlow(
        this.props.graphFlow.concat(this.genGraph(this.props.list))
      );
    }
  };

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
    // Add self if not already present
    let graph = [];
    if (!this.includesID(list.reactFlow.id, this.props.graphFlow)) {
      graph = [list.reactFlow];
    }

    // Base case (no children)
    if (list.children.length === 0) {
      return graph;
    } else {
      list.children.forEach((child) => {
        if (!this.includesID(child.reactFlow.id, this.props.graphFlow)) {
          // Extend graph to include child
          graph = graph.concat(this.genGraph(child), {
            // Create line to child
            id: uuidv4(),
            source: list.reactFlow.id,
            target: child.reactFlow.id,
          });
        }
      });
      return graph;
    }
  };

  /**
   * returns true if the id is contained in the container
   * @param id string
   * @param container list of todo-lists react flows
   */
  includesID(id, container) {
    for (let flow of container) {
      if (flow.id === id) return true;
    }

    return false;
  }

  addChildList = (e) => {
    e.preventDefault();
    this.props.list.addList(new TodoList(this.state.addListInput));
    this.props.updateGraphFlow(
      this.props.graphFlow.concat(this.genGraph(this.props.list))
    );

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

  handleDelete = () => {
    this.props.deleteList(this.props.list.reactFlow.id);
    let newList = this.props.selectedList;
    for (let i = 0; i < this.props.user.lists.length; i++) {
      if (this.props.selectedList) {
        if (
          this.props.user.lists[i].reactFlow.id ==
          this.props.selectedList.reactFlow.id
        ) {
          let updatedLists = this.props.user.lists
            .slice(0, i)
            .push(newList)
            .push(
              this.props.user.lists.slice(i + 1, this.props.user.lists.length)
            );

          this.props.updateLists(updatedLists);
          return;
        }
      }
    }
    this.modalSwitch();
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
            <button onClick={this.handleDelete}>
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
          return (
            <DotPointList
              key={key}
              list={todo}
              depth={this.props.depth + 1}
              graphFlow={this.props.graphFlow}
              updateGraphFlow={this.props.updateGraphFlow}
              deleteList={this.props.deleteList}
              user={this.props.user}
            />
          );
        })}
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return {
    graphFlow: state.user.graphFlow,
    selectedList: state.user.selectedList,
    user: state.user,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateLists: updateLists,
      selectList,
      updateGraphFlow,
      deleteList,
    },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(DotPointList);
