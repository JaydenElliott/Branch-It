import React, { Component } from "react";
import "./childListContainer.scss";

// Components
import TodoList from "../../../../list-handling/todoList";
import ChildList from "./childList";

// Redux
import { connect } from "react-redux";
import { selectedParentList } from "../../../../../redux/actions/userActions";
import { bindActionCreators } from "redux";

class ChildListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRootString: "",
      items: this.props.selected ? this.props.selected.items : [],
      flowJson: [],
    };
  }

  /**
   * Updates redux selected with component items state and flowJson
   */
  updateRedux = () => {
    let update = this.props.selected;
    update.items = this.state.items;
    update.flowJson = this.state.flowJson;
    this.props.selectedParentList(update);
  };

  // Keyboard Input Utility function
  onInputChange = (e) => {
    this.setState({
      inputRootString: e.currentTarget.value,
    });
  };

  // Keyboard Input Utility for submitting "root" lists
  submitItem = async (_e, layer = 0) => {
    _e.preventDefault();
    if (this.state.inputRootString == "") {
      return;
    }

    const list = {
      lists: [],
      done: false,
      content: this.state.inputRootString,
      location: [layer, this.state.items.length + 1],
      coordinates: [-1, -1],
      width: WIDTH,
      parent: this.state.items[0],
    };
    let newList = new TodoList(list);
    newList.parent.lists.push(newList);
    let updatedItems = [...this.state.items, newList];
    await this._setItemStateAsync(updatedItems);
    this.calculateCoordinates();
    await this._setItemStateAsync(updatedItems);
    this.setState({ flowJson: this.getFlowJson() });
    this.updateRedux();
  };

  /**
   *  Set state utility function
   * To prevent asynchronous setState
   */
  _setItemStateAsync = (updatedItems) => {
    return new Promise((resolve) => {
      this.setState({
        items: updatedItems,
        inputRootString: "",
      });
      this.setState(resolve);
    });
  };

  getFlowJson = () => {
    let newGraphElements = [];
    if (this.state.items.length > 0) {
      for (let i = 1; i < this.state.items.length; i++) {
        let item = this.state.items[i];
        let newElement = {
          id: item.location.toString(),
          data: { label: item.content },
          position: { x: item.coordinates[0], y: item.coordinates[1] },
        };
        newGraphElements.push(newElement);
        if (item.parent != undefined) {
          let newConnector = {
            id:
              "c" + item.parent.location.toString() + item.location.toString(),
            source: item.parent.location.toString(),
            target: item.location.toString(),
          };

          newGraphElements.push(newConnector);
        }
      }
    }
    return newGraphElements;
  };

  /**
   * Takes child list submitted via genChildList and inserts it into
   * state.items at the appropriate location.
   *
   * @param childList
   * @param parentLocation
   */
  submitChildList = async (childList, parentLocation) => {
    let parentIdx = null;
    let insertIdx = null;
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].location == parentLocation) {
        parentIdx = i;
      }
    }
    if (parentIdx == null) {
      throw "CHILD LIST INSERT CANNOT FIND PARENT";
    } else {
      let i = parentIdx + 1;
      while (
        i < this.state.items.length &&
        this.state.items[i].location[0] ===
          this.state.items[parentIdx].location[0] + 1
      ) {
        i += 1;
      }
      insertIdx = i;
      let updatedItems = this.state.items.slice();
      updatedItems.splice(insertIdx, 0, childList);
      await this._setItemStateAsync(updatedItems);
      this.calculateCoordinates();
      await this._setItemStateAsync(updatedItems);
      this.setState({ flowJson: this.getFlowJson() });
      this.updateRedux();
    }
  };

  /**
   * Iteratively deletes all child items of the provided index as well as the index item itself.
   *
   * @param index of item to be deleted
   */
  deleteList = async (index) => {
    // To change the list in an immutable fashion, make a new list.
    let updatedItems = this.state.items.slice();

    // Delete all child items iteratively
    const thisLocation = this.state.items[index].location;

    // Delete from parent list
    updatedItems[index].parent.lists = updatedItems[index].parent.lists.filter(
      (list) => list.location !== thisLocation
    );

    // Delete this item
    updatedItems.splice(index, 1);

    // Delete children of this item.
    while (
      index < updatedItems.length &&
      updatedItems[index].location[0] > thisLocation[0]
    ) {
      updatedItems.splice(index, 1);
    }

    // Update the state
    await this._setDeleteStateAsync(updatedItems);
    this.calculateCoordinates();
    await this._setDeleteStateAsync(updatedItems);
    // Updating redux
    this.setState({ flowJson: this.getFlowJson() });
    this.updateRedux();
  };

  /**
   *  Set state utility function
   * To prevent asynchronous setState
   */
  _setDeleteStateAsync = (updatedItems) => {
    return new Promise((resolve) => {
      this.setState({ items: updatedItems });
      this.setState(resolve);
    });
  };

  // Calculate each node's (lists) coordinate
  // To be rendered on the graph
  calculateCoordinates = () => {
    for (let i = 0; i < this.state.items.length; i++) {
      if (i == 0) {
        continue;
      }
      let newCoords = this.coord_adapter(
        root_coordinate,
        this.state.items[i].compute_coordinate(),
        xscale,
        yscale
      );
      this.state.items[i].coordinates = newCoords;
    }
  };

  // Scale the coordinates to fit the vector space
  coord_adapter = (root_coordinate, coordinate, xscale, yscale) => {
    return [
      root_coordinate[0] + coordinate[0] * xscale,
      root_coordinate[1] + coordinate[1] * yscale,
    ];
  };

  render() {
    return (
      <div className="nav-pages-share">
        <form onSubmit={this.submitItem}>
          <input
            type="text"
            className="search-bar"
            placeholder="Add root list"
            onChange={this.onInputChange}
            value={this.state.inputRootString}
          />
        </form>
        <div>
          {this.state.items.map((list, index) => (
            <ChildList
              onClickDel={() => this.deleteList(index)}
              list={list}
              submitChildList={this.submitChildList}
              width={WIDTH}
              itemCount={this.state.items.length}
            />
          ))}
        </div>
      </div>
    );
  }
}

// Graph settings (make this modular - maybe settings file later)
var WIDTH = 1;
var root_coordinate = [400, 50];
var xscale = 40;
var yscale = 60;

const mapStateToProps = (state) => {
  return { navPage: state.navPage, user: state.user };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { selectedParentList: selectedParentList },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ChildListContainer);
