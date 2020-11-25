import React from "react";
import { Component } from "react";
import "../components/renderList.css";
import Modal from "react-modal";

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
    };
  }

  setModalOn = () => {
    this.setState({
      modalShow: true,
    });
  };

  setModalOff = () => {
    this.setState({
      modalShow: false,
    });
  };

  render() {
    return (
      <div className="listChild" id={"arranged"}>
        <div className="listItem">
          <span>&#8226;</span>
          {this.props.content}
        </div>

        <div className="modal-open-close" id={"goToLeft"}>
          <button
            type="button"
            className="close"
            onClick={this.setModalOn} // add later
          >
            +
          </button>
          <Modal isOpen={this.state.modalShow} style={modalStyle}>
            <h3>Add nested item</h3>
            <button onClick={this.setModalOff}>Cancel</button>
          </Modal>
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
