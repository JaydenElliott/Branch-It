import React, { Component } from "react";
import "../../../../componentStyles/homePage/side-container/nav-pages/listOption.css";
import ListContainer from "../../../listHandling/listContainer";

// Redux
import { connect } from "react-redux";
import { setSelected } from "../../../../redux/actions/listsActions";

export interface ListOptionState {
  list: ListContainer;
}
class ListOption extends Component<any, ListOptionState> {
  constructor(props: any) {
    super(props);

    // No state
  }

  buttonClickHandler = () => {
    this.props.setSelected(this.props.list);
    this.props.menuToggle();
  };

  /**
   * RENDERING: displays a button (in the side-search-bar) which can be
   *            pressed to select that particular list to display.
   */
  renderButton = () => {
    return (
      <button
        className="root-choice-button"
        style={
          this.props.list === (this.props.selected ? this.props.selected : null)
            ? {
                backgroundColor: "#608C4C",
                color: "#ffffff",
              }
            : {
                outline: "none",
                backgroundColor: "rgba(255,255,255,0.5)",
                border: "1px solid grey",
              }
        }
        // Sets redux state
        onClick={this.buttonClickHandler}
        // Displays a title (hover to see) only if the character length would result in an overflow
        title={this.props.list.name.length > 16 ? this.props.list.name : ""}
      >
        <span>{this.props.list.name}</span>
      </button>
    );
  };

  render() {
    return (
      <div className="listOption">
        <input
          className="checkbox"
          type="checkbox"
          defaultChecked={this.props.list.done}
          onChange={() => (this.props.list.done = !this.props.list.done)}
        />
        {this.renderButton()}
      </div>
    );
  }
}

// Redux mapping to props
const mapStateToProps = (state: any) => {
  const { selected } = state.listsReducer;
  return {
    selected,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelected: (selected: ListContainer | undefined | null) => {
      dispatch(setSelected(selected));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOption);
