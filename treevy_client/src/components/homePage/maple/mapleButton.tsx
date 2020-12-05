import React, { ChangeEvent, Component } from "react";
import EcoIcon from "@material-ui/icons/Eco";
import Button from "@material-ui/core/Button";

import "../../../componentStyles/homePage/maple/mapleButton.css";

export default class MapleButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Maple">
        <Button
          startIcon={<EcoIcon />}
          variant="contained"
          style={{
            backgroundColor: "#2196f3",
            height: "80%",
            color: "#ffffff",
          }}
        >
          Maple
        </Button>
      </div>
    );
  }
}
