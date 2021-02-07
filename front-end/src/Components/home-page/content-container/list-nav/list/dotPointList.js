import React, { Component } from "react";
import TodoList from "../../../../list-handling/todoList";
import { selectList } from "../../../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./dotPointList.scss";

class DotPointList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemModalOpen: false,
    };
  }

  addChildList = () => {
    this.props.list.addList(new TodoList("testingName"));
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <div className="dot-point-container">
          <div className="dot-point-dot">&#183;</div>
          <div className="dot-point-title">{this.props.list.listName}</div>
          <div className="dot-point-more">
            <button onClick={this.addChildList}>Add</button>
          </div>
        </div>
        {this.props.list.children.map((todo) => {
          return <DotPointList list={todo} depth={this.props.depth + 1} />;
        })}
      </div>
    );
  }
}

// Redux mappings to props
const mapStateToProps = (state) => {
  return { selectedList: state.user.selectedList };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      //   updateLists: updateLists,
      selectList: selectList,
    },
    dispatch
  );
};
export default connect(mapStateToProps, matchDispatchToProps)(DotPointList);
