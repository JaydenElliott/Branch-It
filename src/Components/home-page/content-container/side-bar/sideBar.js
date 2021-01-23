import { Component } from "react";

// Styling
import sideBar from "./sideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar-container">
        <button className="sidebar-list-button">
          <FontAwesomeIcon
            icon={faList}
            style={{ height: "100%", width: "45%" }}
          />
        </button>
      </div>
    );
  }
}

export default SideBar;
