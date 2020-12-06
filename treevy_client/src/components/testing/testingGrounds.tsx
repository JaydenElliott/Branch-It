import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";
import SignUpPage from "../homePage/sign-up/signupPage";

export default class TestingGrounds extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SignUpPage />
      </div>
    );
  }
}
