// External Modules
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { setNavWidth } from "../../../../redux/actions/listNavActions";
import { updateLists } from "../../../../redux/actions/userActions";
import TodoList from "../../../list-handling/todoList";
import ChildListNav from "./childListNav";

// Styling
import "./listNav.scss";
import List from "./list/list";

class ListNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newListName: "",
    };
  }

  addList = (e) => {
    e.preventDefault();

    // Create a new todo list
    const newList = new TodoList(this.state.newListName);

    // Add to redux
    let newListsState = [...this.props.user.lists, newList];
    this.props.updateLists(newListsState);

    // Clear input
    this.setState({
      newListName: "",
    });
  };

  renderLists = () => {
    return (
      <div className="list-nav-parent-list-container">
        {this.props.user.lists.map((list) => {
          return <List list={list} />;
        })}
      </div>
    );
  };

  renderChildLists = () => {
    return <div></div>;
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
          <form className="nav-new-list-form" onSubmit={this.addList}>
            <input
              type="input"
              placeholder="Insert new list"
              value={this.state.newListName}
              onChange={this.onInputChange}
            />
          </form>
        </div>
        {this.renderLists()}
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
    { setNavWidth: setNavWidth, updateLists: updateLists },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(ListNav);
