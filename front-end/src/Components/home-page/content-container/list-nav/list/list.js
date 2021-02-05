// External Components
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { selectList } from "../../../../../redux/actions/userActions";

// Styling
import "./list.scss";

class List extends Component {
  constructor(props) {
    super(props);
  }

  listButtonClick = () => {
    this.props.selectList(this.props.list);
  };

  render() {
    return (
      <button className="list-container" onClick={() => this.listButtonClick()}>
        <input className="list-tickbox" type="checkbox" />
        <div className="list-title">
          {" "}
          {this.props.list.listName} {this.props.selectList.listName}
        </div>
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return { selectedList: state.user.selectedList };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectList: selectList }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(List);
