import React, { ChangeEvent, Component } from "react";
import ListHandler from "../../../listHandling/listHandler";

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

  render() {
    return (
      <div
        className="listOption"
        onClick={() => alert('hi')}
      >
        <input
            type="checkbox"
        >
        </input>
        
        <label>
            {this.state.list.state.listName}
        </label>
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

export default connect(mapStateToProps, null)(ListOption);