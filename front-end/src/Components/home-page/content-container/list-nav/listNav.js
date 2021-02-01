// External Modules
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { setNavWidth } from "../../../../redux/actions/listNavActions";
import {
  selectedParentList,
  updateParentLists,
} from "../../../../redux/actions/userActions";
import TodoList from "../../../list-handling/todoList";
import ListContainer from "../../../list-handling/listContainer";
import graphSettings from "../../../../config/graphSettings.json";

// Styling
import "./listNav.scss";
import ParentList from "./parent-lists/parentList";
import ChildList from "./child-list/childList";
import ChildListContainer from "./child-list/childListContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

class ListNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderParentLists: true,
      newListName: "",
    };
  }

  alternateListView = () => {
    this.setState({
      renderParentLists: !this.state.renderParentLists,
    });
  };

  addNewParentList = (e) => {
    e.preventDefault();
    /**
     * An invisible node is required for the graph generation
     * All the actual "root" lists need a parent to align themselves with
     */
    const invisibleRootNodeAttributes = {
      lists: [],
      done: false,
      content: "",
      location: [0, 0],
      coordinates: graphSettings.root_coordinate,
      width: graphSettings.width,
      parent: undefined,
    };
    const rootNode = new TodoList(invisibleRootNodeAttributes);
    let newListContainer = new ListContainer(
      this.state.newListName,
      [rootNode],
      []
    );

    let newListsState = [...this.props.user.lists, newListContainer];
    this.props.updateParentLists(newListsState);

    this.setState({
      newListName: "",
    });
  };

  renderParentLists = () => {
    return (
      <div className="list-nav-parent-list-container">
        {this.props.user.lists.map((list) => {
          return <ParentList list={list} swapView={this.alternateListView} />;
        })}
      </div>
    );
  };

  renderChildLists = () => {
    // return <ChildListContainer />;
    return;
  };

  onInputChange = (e) => {
    this.setState({
      newListName: e.currentTarget.value,
    });
  };

  goBackToSelection = () => {
    this.props.selectedParentList({});
    this.setState({ renderParentLists: true });
  };

  renderTopBar = () => {
    if (this.state.renderParentLists) {
      return (
        <div className="list-nav-new-list">
          <form className="nav-new-list-form" onSubmit={this.addNewParentList}>
            <input
              type="input"
              placeholder="Insert new list"
              value={this.state.newListName}
              onChange={this.onInputChange}
            />
          </form>
        </div>
      );
    } else {
      return (
        <div className="list-nav-new-list">
          <div className="selected-parent-list">
            {this.props.user.selectedList.name}
          </div>
          <button
            className="back-list-choice-button"
            onClick={this.goBackToSelection}
          >
            <FontAwesomeIcon
              icon={faUndoAlt}
              style={{ height: "100%", width: "100%" }}
            />
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div
        className="list-nav-container"
        style={{ width: `${this.props.navPage.width}px` }}
      >
        {console.log(this.props.user.selectedList)}
        {this.renderTopBar()}
        {this.state.renderParentLists
          ? this.renderParentLists()
          : this.renderChildLists()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { navPage: state.navPage, user: state.user };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setNavWidth: setNavWidth,
      updateParentLists: updateParentLists,
      selectedParentList: selectedParentList,
    },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(ListNav);
