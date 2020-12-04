import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import PersonIcon from "@material-ui/icons/Person";

export default class AccountButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      accountModalOpenBool: false,
    };
  }

  render() {
    return (
      <div className="Log-in">
        <Button
          startIcon={<PersonIcon />}
          variant="contained"
          style={{
            backgroundColor: "#608C4C",
            height: "80%",
            color: "#ffffff",
          }}
        >
          Account
        </Button>
      </div>
    );
  }
}
