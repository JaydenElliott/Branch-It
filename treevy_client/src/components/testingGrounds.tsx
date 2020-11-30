import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import FacebookIcon from "@material-ui/icons/Facebook";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
export default class TestingGrounds extends Component<any, any> {
  render() {
    return (
      <div>
        <div>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            style={{ backgroundColor: "#4db6ac" }}
          >
            Save
          </Button>
        </div>
        <div style={{ marginTop: "50px" }}>
          <Button
            startIcon={<ShareIcon />}
            variant="contained"
            style={{ backgroundColor: "#4db6ac" }}
          >
            Share
          </Button>
        </div>
        <div style={{ marginTop: "50px" }}>
          <Button
            startIcon={<PersonIcon />}
            variant="contained"
            style={{ backgroundColor: "#bfe7dc" }}
          >
            Log in
          </Button>
        </div>
        <div style={{ marginTop: "50px" }}>
          <Button
            startIcon={<FacebookIcon />}
            variant="contained"
            style={{
              backgroundColor: "#5e77f9",
              color: "#ffffff",
            }}
          >
            Sign up with Facebook
          </Button>
        </div>

        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Primary"
        />
      </div>
    );
  }
}
