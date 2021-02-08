// External Components
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { updateLists, selectList, updateGraphFlow } from "../../../../redux/actions/userActions";
import { setNavWidth } from "../../../../redux/actions/listNavActions";
import TodoList from "../../../list-handling/todoList";
import DotPointList from "./list/dotPointList";

// Styling
import "./childListNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

class ChildListNav extends Component {
  state = {
    newListName: "",
  };

  /* Submits the main list's children.
   Granchildren great-granchildren etc...
   Use another method
  */
  addList = (e) => {
    e.preventDefault();

    // Create a new todo list
    const newList = new TodoList(this.state.newListName);

    // Add to redux
    let newChildren = [...this.props.user.selectedList.children, newList];
    let newParent = this.props.user.selectedList;
    newParent.children = newChildren;
    this.props.updateLists(newParent);

    // Clear input
    this.setState({
      newListName: "",
    });
  };

  onInputChange = (e) => {
    this.setState({
      newListName: e.currentTarget.value,
    });
  };

  handleBackButton = () => {
    this.props.selectList(undefined);
    this.props.updateGraphFlow([]);
  };

  render() {
    return (
      <div
        className="child-list-nav-container"
        style={{ width: `${this.props.navPage.width}px` }}
      >
        {/* {this.enterRecurs()} */}
        <div className="child-list-top-row">
          <div className="child-list-title">
            {this.props.user.selectedList.listName}
          </div>
          <button className="back-list-choice-button">
            <FontAwesomeIcon
              icon={faUndoAlt}
              style={{ height: "100%", width: "100%" }}
              onClick={this.handleBackButton}
            />
          </button>
        </div>
        <DotPointList list={this.props.user.selectedList} depth={0} />
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return { navPage: state.navPage, user: state.user };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setNavWidth,
      updateLists,
      selectList,
      updateGraphFlow,
    },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(ChildListNav);
