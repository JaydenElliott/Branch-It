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
            <div className="top-container">
              <div />
              <div className="top-container_text">Sign-up to branch-it!</div>
              <div className="top-container_orsignin">
                Already have an account? <a href="url"> Sign-in</a>
              </div>
            </div>
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
            <div className="bottom-container">
              <label>
                <input type="checkbox" className="news-button" /> Sign up for
                news, updates and other awesome stuff!
              </label>
              <label>
                <input type="checkbox" className="TandC" /> I accept the{" "}
                <a href="url"> Terms and Conditions </a>
              </label>
              <div className="sign-up-button-wrapper">
                <div />
                <button className="sign-up-button">Sign up</button>
                <div />
              </div>
              <div className="or-text">----------- or -----------</div>
              <div className="sign-up-facebook-wrapper">
                <div />
                <button className="sign-up-facebook">
                  Sign up with Facebook
                </button>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
