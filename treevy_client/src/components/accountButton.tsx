import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/signupPage.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default class AccountButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      accountModalOpenBool: false,
    };
  }

  render() {
    return <div>hi</div>;
  }
}
