// External Modules
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Styling
import sideBar from "./sideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

// Internal Modules
import { setNavWidth } from "../../../../redux/actions/listNavActions";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  handleListButtonClick = () => {
    if (this.props.navPage.width == 0) {
      this.props.setNavWidth(400);
    } else {
      this.props.setNavWidth(0);
    }
  };

  render() {
    return (
      <div className="sidebar-container">
        <button
          className="sidebar-list-button"
          onClick={this.handleListButtonClick}
        >
          <FontAwesomeIcon
            icon={faList}
            style={{ height: "100%", width: "45%" }}
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { navPage: state.navPage };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ setNavWidth: setNavWidth }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(SideBar);
