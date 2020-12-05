import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import "../../../componentStyles/homePage/save/saveButton.css";
export default class SaveButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Save">
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          style={{
            backgroundColor: "#608C4C",
            height: "80%",
            color: "#ffffff",
          }}
        >
          Save
        </Button>
      </div>
    );
  }
}
