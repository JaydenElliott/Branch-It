import React, { ChangeEvent, Component } from "react";
import ListHandler from "../../../listHandling/listHandler";
import "../../../../componentStyles/homePage/side-container/nav-pages/listOption.css";

// Redux
import { connect } from "react-redux";
import { setSelected } from "../../../../redux/actions/listsActions";

export interface ListOptionState {
    list: ListHandler;
}
class ListOption extends Component<any, ListOptionState> {
  constructor(props: any) {
    super(props);

    this.state = {
        list: props.list || undefined,
    }
  }

  /**
   * RENDERING: displays a button (in the side-search-bar) which can be
   *            pressed to select that particular list to display.
   */
  renderButton = () => {
    return (
        <button
            style={
            this.state.list === (this.props.selected ? this.props.selected : null)
                ? {
                    height: "35px",
                    fontSize: "20px",
                    textTransform: "none",
                    display: "flex",
                    margin: "4%",
                    width: "90%",
                    boxShadow: "none",
                    backgroundColor: "#608C4C",
                    borderColor: "black",
                    color: "#ffffff",
                }
                : {
                    height: "35px",
                    fontSize: "20px",
                    textTransform: "none",
                    display: "flex",
                    margin: "4%",
                    width: "90%",
                }
            }
            // Sets redux state
            onClick={() => this.props.setSelected(this.state.list)}
            // Displays a title (hover to see) only if the character length would result in an overflow
            title={this.state.list.state.listName.length > 16 ? this.state.list.state.listName : ""}
        >
            <span>
                {this.state.list.state.listName}
            </span>
        </button>
    );

  }

  render() {
      console.log("getting:", this.state.list.state.listName)
    return (
      <div
        className="listOption"
      >
        <input id="list" className="checkmark" type="checkbox" />
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
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      setSelected: (selected: ListHandler | undefined | null) => {
        dispatch(setSelected(selected));
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ListOption);