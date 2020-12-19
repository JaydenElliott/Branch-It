import React, { ChangeEvent } from "react";
import { Component } from "react";
import "../../componentStyles/listHandling/renderList.css";
import "../../componentStyles/listHandling/renderListModal.css";
import Modal from "react-modal";
import TreevyList, { ListState } from "./treevyList";
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default class RenderList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalShow: false,
      tempString: "",
    };
  }

  /**
   * Modal Utility Method
   */
  setModalOn = () => {
    this.setState({
      modalShow: true,
    });
  };
  /**
   * Modal Utility Method
   */
  setModalOff = () => {
    this.setState({
      modalShow: false,
    });
  };

  /**
   * Keyboard Utility Method
   */
  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      tempString: e.currentTarget.value,
    });
  };

  newChildList = (_e: any) => {
    _e.preventDefault();
    const childListSpecs: ListState = {
      lists: [],
      done: false,
      content: this.state.tempString,
      layer: this.props.list.layer + 1,
      ID: this.props.idCounter + 1,
      width: this.props.width,
      parent: this.props.list,
    };
    let newChildList = new TreevyList(childListSpecs);
    this.props.incrementCounter();
    this.props.list.appendChildList(newChildList);
    this.setState({
      modalShow: false,
    });
  };

  render() {
    return (
      <div className="ListContainer">
        <div
          className="content"
          style={{
            marginLeft: (this.props.list.layer * 20).toString() + "px",
          }}
        >
          <span>&#8226;</span>
          {this.props.list.content}
        </div>
        <div className="gap" />
        <button className="add" type="button" onClick={this.setModalOn}>
          +
        </button>

        <div className="modal">
          <Modal isOpen={this.state.modalShow} style={modalStyle}>
            Add nested item
            <form onSubmit={this.newChildList}>
              <input
                className="new-todo"
                type="text"
                onChange={this.onInputChange}
                value={this.state.tempString}
              />
              <button id="submitBtn" type="submit"></button>
            </form>
            <button onClick={this.setModalOff}>Cancel</button>
          </Modal>
        </div>

        <button
          type="button"
          className="remove"
          // onClick={this.props.onClickDel}
        >
          -
        </button>

        {this.props.list.lists.map((childList: any) => {
          return (
            <RenderList
              list={childList}
              idCounter={this.state.idCounter}
              incrementCounter={this.props.incrementCounter}
              width={this.props.width}
            />
          );
        })}
        {/* <div className="Childlists">
          {this.props.parentList.lists.map((list: any, index: number) => (
            <RenderList
              onClickDel={() => this.props.parentList.deleteList(index)}
              parentList={list}
              idCounter={this.state.idCounter}
              width={this.props.width}
            />
          ))}
        </div> */}
      </div>
    );
  }
}
