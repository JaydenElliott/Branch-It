import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

import "../../../componentStyles/homePage/share/shareButton.css";

export default class ShareButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="top-bar-column-3-share">
        <Button
          startIcon={<ShareIcon />}
          variant="contained"
          style={{
            backgroundColor: "#608C4C",
            color: "#ffffff",
            height: "33px",
            width: "95px",
          }}
        >
          Share
        </Button>
      </div>
    );
  }
}
