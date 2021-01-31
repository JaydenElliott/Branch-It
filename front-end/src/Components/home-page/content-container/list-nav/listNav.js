// External Modules
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { setNavWidth } from "../../../../redux/actions/listNavActions";
import { updateParentLists } from "../../../../redux/actions/userActions";
import TodoList from "../../../list-handling/todoList";
import ListContainer from "../../../list-handling/listContainer";
import graphSettings from "../../../../config/graphSettings.json";

// Styling
import "./listNav.scss";
import ParentList from "./parent-lists/parentList";
import ChildList from "./child-list/childList";
import ChildListContainer from "./child-list/childListContainer";

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
    return <ChildListContainer />;
  };

  onInputChange = (e) => {
    this.setState({
      newListName: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div
        className="list-nav-container"
        style={{ width: `${this.props.navPage.width}px` }}
      >
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
    { setNavWidth: setNavWidth, updateParentLists: updateParentLists },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(ListNav);
