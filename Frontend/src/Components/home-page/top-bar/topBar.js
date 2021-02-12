import React, { Component } from "react";

// Styling
import "./topBar.scss";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import EcoIcon from "@material-ui/icons/Eco";
import PersonIcon from "@material-ui/icons/Person";
import logo from "../../../assets/templogo.svg";

// Internal Components
import LoginModal from "./login-modal/loginModal";

// Redux
import { connect } from "react-redux";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loginModalOpen: false };
  }

  toggleLoginModal = () => {
    let toggle = this.state.loginModalOpen ? false : true;
    this.setState({
      loginModalOpen: toggle,
    });
  };

  /**
   * Sets the login modal state.
   * @param bool true or false.
   */
  setModalState = (bool) => {
    this.setState({loginModalOpen: bool});
  }

  render() {
    return (
      <div className="topbar-container">
        <div className="save-button">
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            style={{
              backgroundColor: "#608C4C",
              height: "33px",
              width: "95px",
              color: "#ffffff",
              fontSize: "10px",
            }}
          >
            Save
          </Button>
        </div>
        <div className="title">Branch-It</div>
        <div className="share-button">
          <Button
            startIcon={<ShareIcon />}
            variant="contained"
            style={{
              backgroundColor: "#608C4C",
              color: "#ffffff",
              height: "33px",
              width: "95px",
              fontSize: "10px",
            }}
          >
            Share
          </Button>
        </div>
        <div className="maple-button">
          <Button
            startIcon={<EcoIcon />}
            variant="contained"
            style={{
              backgroundColor: "#2196f3",
              height: "33px",
              width: "95px",
              color: "#ffffff",
              fontSize: "10px",
            }}
          >
            Maple
          </Button>
        </div>
        <div className="login-button">
          <Button
            startIcon={<PersonIcon />}
            variant="contained"
            disabled={this.props.userInfo}
            style={
              this.props.userInfo ?
                {
                  backgroundColor: "grey",
                  height: "33px",
                  width: "95px",
                  color: "#ffffff",
                  fontSize: "10px",
                  width: "100%",
                }
              :
                {
                  backgroundColor: "#608C4C",
                  height: "33px",
                  width: "95px",
                  color: "#ffffff",
                  fontSize: "10px",
                  width: "100%",
                }
          }
            onClick={this.toggleLoginModal}
          >
            {this.props.userInfo ? this.props.userInfo.email : "Log-in"}
          </Button>
        </div>
        <LoginModal isOpen={this.state.loginModalOpen} setModalState={this.setModalState} />
      </div>
    );
  }
}

// Redux mappings to props

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};
export default connect(mapStateToProps)(TopBar);
