import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/signupPage.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import Button from "@material-ui/core/Button";
import logo from "../logo/templogo.svg";
import Checkbox from "@material-ui/core/Checkbox";
import { Check } from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
              <FormControlLabel
                control={
                  <Checkbox name="checkedB" style={{ color: "#5e77f9" }} />
                }
                label="Sign up for
                news, updates and other awesome stuff!"
              />
              <FormControlLabel
                control={
                  <Checkbox name="checkedB" style={{ color: "#5e77f9" }} />
                }
                label="I accept the Terms and Conditions"
              />
              <div className="sign-up-button-wrapper">
                <div />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#bfe7dc",
                    color: "#ffffff",
                    fontSize: "15px",
                  }}
                >
                  Sign up
                </Button>
                <div />
              </div>
              <div className="or-text">----------- or -----------</div>
              <div className="sign-up-facebook-wrapper">
                <div />
                <Button
                  startIcon={<FacebookIcon />}
                  variant="contained"
                  style={{
                    backgroundColor: "#5e77f9",
                    color: "#ffffff",
                    fontSize: "15px",
                  }}
                >
                  Sign up with Facebook
                </Button>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
