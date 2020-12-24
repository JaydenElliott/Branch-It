import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import DehazeIcon from "@material-ui/icons/Dehaze";
import "../../../../componentStyles/homePage/top-bar/compact-button/compactButton.css";
export default class CompactButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="top-bar-column-3-compact">
        <Button
          startIcon={<DehazeIcon />}
          variant="contained"
          style={{
            height: "80%",
          }}
        />
      </div>
    );
  }
}
