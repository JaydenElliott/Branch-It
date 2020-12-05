import React, { ChangeEvent, Component } from "react";
import FacebookLoginWithButton from "react-facebook-login";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";

import "../../../componentStyles/homePage/sign-up/sign-up-google.css";

export default class GoogleSignup extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  responseGoogle = (response: any) => {
    console.log(response);
  };

  render() {
    return (
      <div className="sign-up-google">
        <GoogleLogin
          clientId="256239432306-k4rmonuh38dbdros838nqcqisdjv72ri.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
          style={{ width: "100px" }}
        />
      </div>
    );
  }
}
