import React, { ChangeEvent, Component } from "react";
import FacebookLoginWithButton from "react-facebook-login";
import Button from "@material-ui/core/Button";
import "../../../../componentStyles/homePage/sign-up/sign-up-facebook.css";

export default class FacebookLogin extends Component<any, any> {
  responseFacebook = (response: any) => {
    console.log(response);
  };

  componentClicked = () => {
    console.log("Clicked!");
  };
  render() {
    return (
      <div className="sign-up-facebook">
        <FacebookLoginWithButton
          size="small"
          appId="880192362718006"
          autoLoad
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
      </div>
    );
  }
}
