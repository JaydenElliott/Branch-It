import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import DehazeIcon from "@material-ui/icons/Dehaze";
export default class CompactButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button
        startIcon={<DehazeIcon />}
        variant="contained"
        style={{
          height: "80%",
        }}
      />
    );
  }
}
