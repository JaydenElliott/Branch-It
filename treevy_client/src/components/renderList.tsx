import React, { ChangeEvent } from "react";
import { Component } from "react";
import "../components/renderList.css";
import Modal from "react-modal";
import TreevyList, { ListState } from "../components/treevyList";

// Temporary - make an actual style later
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
/**
 * Class to create beatifully rendered lists
 */
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

  /**
   * Generates and submits a child list to it's parent
   *
   * @param _e: used to prevent page refresh
   * @param layer: layer of the new list being inserted
   *
   * @returns: void => sends new list to submitChildList() method
   * to be rendered
   */
  genChildList = (_e: any, layer = 1): void => {
    _e.preventDefault();
    if (this.state.tempString == "") {
      return;
    }
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.tempString,
      location: [
        this.props.parent.state.location[0] + 1,
        this.props.parent.state.lists.length + 1,
      ],
      tempString: "",
      parent: this.props.parent,
    };
    let newChildList = new TreevyList(list);
    this.setState({
      tempString: "",
    });
    this.props.submitChildList(newChildList, this.props.parent.state.location);
    this.setState({
      modalShow: false,
    });
  };

  render() {
    return (
      <div className="listChild" id={"arranged"}>
        <div
          style={{
            marginLeft:
              ((this.props.parent.state.location[0] - 1) * 20).toString() +
              "px",
          }}
        >
          <span>&#8226;</span>
          {this.props.parent.state.content}
        </div>
        <div className="modal-open-close" id={"goToLeft"}>
          <button type="button" className="close" onClick={this.setModalOn}>
            +
          </button>
          <div className="modal">
            <Modal isOpen={this.state.modalShow} style={modalStyle}>
              Add nested item
              <form onSubmit={this.genChildList}>
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
        </div>
        <div className="RemoveButton" id={"goToLeft"}>
          <button
            type="button"
            className="close"
            onClick={this.props.onClickDel}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}
