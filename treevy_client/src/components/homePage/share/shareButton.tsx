import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

import "../../../componentStyles/homePage/share/shareButton.css";

export default class ShareButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Share">
        <Button
          startIcon={<ShareIcon />}
          variant="contained"
          style={{
            backgroundColor: "#608C4C",
            height: "80%",
            color: "#ffffff",
          }}
        >
          Share
        </Button>
      </div>
    );
  }
}
