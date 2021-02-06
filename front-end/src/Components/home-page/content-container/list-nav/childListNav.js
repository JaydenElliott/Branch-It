// External Components
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { updateLists } from "../../../../redux/actions/userActions";
import { setNavWidth } from "../../../../redux/actions/listNavActions";
import { selectList } from "../../../../redux/actions/userActions";

// Styling
import "./childListNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

class ChildListNav extends Component {
  state = {
    newListName: "",
  };

  onInputChange = (e) => {
    this.setState({
      newListName: e.currentTarget.value,
    });
  };

  handleBackButton = () => {
    this.props.selectList(undefined);
  };

  render() {
    return (
      <div
        className="child-list-nav-container"
        style={{ width: `${this.props.navPage.width}px` }}
      >
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
        <div className="child-list-nav-new-list">
          <form className="child-nav-new-list-form" onSubmit={this.addList}>
            <input
              type="input"
              placeholder="Insert new list"
              value={this.state.newListName}
              onChange={this.onInputChange}
            />
          </form>
        </div>
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
      setNavWidth: setNavWidth,
      updateLists: updateLists,
      selectList: selectList,
    },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(ChildListNav);
