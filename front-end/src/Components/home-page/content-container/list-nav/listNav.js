// External Modules
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { setNavWidth } from "../../../../redux/actions/listNavActions";

// Styling
import "./listNav.scss";

class ListNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="list-nav-container"
        style={{ width: `${this.props.navPage.width}px` }}
      ></div>
    );
  }
}

const mapStateToProps = (state) => {
  return { navPage: state.navPage };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ setNavWidth: setNavWidth }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ListNav);
