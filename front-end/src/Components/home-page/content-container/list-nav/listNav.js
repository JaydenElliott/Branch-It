// External Modules
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal Modules
import { setNavWidth } from "../../../../redux/actions/listNavActions";

// Styling
import "./listNav.scss";
import ParentList from "./parent-lists/parentList";
import ChildList from "./child-list/childList";

class ListNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderParentLists: true,
    };
  }

  renderParentLists = () => {
    return (
      <div className="list-nav-parent-list-container">
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
        <ParentList listname={"Washing"} />
      </div>
    );
  };

  renderChildLists = () => {
    return <ChildList />;
  };

  render() {
    return (
      <div
        className="list-nav-container"
        style={{ width: `${this.props.navPage.width}px` }}
      >
        <div className="list-nav-new-list">
          <form className="nav-new-list-form">
            <input placeholder="Insert new list" />
          </form>
        </div>
        {this.state.renderParentLists
          ? this.renderParentLists()
          : this.renderChildLists()}
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
export default connect(mapStateToProps, matchDispatchToProps)(ListNav);
