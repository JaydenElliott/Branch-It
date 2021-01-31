// External Components
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { selectedParentList } from "../../../../../redux/actions/userActions";

// Styling
import "./parentList.scss";

class ParentList extends Component {
  state = {
    newListName: "",
  };

  listButtonClick = () => {
    this.props.selectedParentList(this.props.list);
    this.props.swapView();
  };

  render() {
    return (
      <button className="parent-list-container" onClick={this.listButtonClick}>
        <input className="parent-list-tickbox" type="checkbox" />
        <div className="parent-list-title"> {this.props.list.name}</div>
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return { navPage: state.navPage, user: state.user };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { selectedParentList: selectedParentList },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(ParentList);
