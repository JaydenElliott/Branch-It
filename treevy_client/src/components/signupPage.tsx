import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/signupPage.css";
import logo from "../logo/templogo.svg";
export default class SignUpPage extends Component<any, any> {
  render() {
    return (
      <div className="page-container">
        <div className="grid-container">
          <div className="sign-up-image"></div>
          <div className="create-account">
            <div className="top-container"></div>
            <div className="above-button-text">Email</div>
            <div className="input-field">
              <input type="text" id="keyboardInput" />
            </div>
            <div className="above-button-text">Username</div>
            <div className="input-field">
              <input type="text" id="keyboardInput" />
            </div>
            <div className="above-button-text">
              <p className="alignleft">Password</p>
              <p className="alignright">SHOW</p>
            </div>
            <div className="input-field">
              <input type="text" id="keyboardInput" />
            </div>
            <div className="bottom-container"></div>
          </div>
        </div>
      </div>
    );
  }
}
