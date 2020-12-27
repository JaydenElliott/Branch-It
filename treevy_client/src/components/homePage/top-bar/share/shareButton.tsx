import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

export default class ShareButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}
