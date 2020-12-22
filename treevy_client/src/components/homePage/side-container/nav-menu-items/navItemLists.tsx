import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
// import "../../../../componentStyles/homePage/side-container/nav-menu-items/navitem";

export default class NavItemLists extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button
        startIcon={<FormatListBulletedIcon style={{ fontSize: "30px" }} />}
        variant="contained"
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          color: "black",
          boxShadow: "None",
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      />
    );
  }
}
