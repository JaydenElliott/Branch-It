import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

export default class SignupButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { modalShow: false };
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
  render() {
    return (
      <div className="Signup">
        <Button onClick={this.setModalOn}>Signup</Button>
      </div>
    );
  }
}
