import React, { Component } from "react";
import TodoList from "../../../../list-handling/todoList";
import { selectList } from "../../../../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./dotPointList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons"; // prettier-ignore

class DotPointList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemModalOpen: false,
      addListInput: "",
    };
  }

  addChildList = (e) => {
    e.preventDefault();
    this.props.list.addList(new TodoList(this.state.addListInput));

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
