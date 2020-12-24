import React, { Component } from "react";
import "../../../componentStyles/homePage/containers/listContainer.css";
import ListHandler from "../../listHandling/listHandler";
import Draggable from "react-draggable";

// Redux
import { connect } from "react-redux";

/**
 * Defines the state for the ListContainer component
 */
interface ListContainerState {
    // Information about the selected list
    selectedList: ListHandler;

    // Left and right coordinates in pixels
    leftX: number;
    rightX: number;
}
class ListContainer extends Component<any, ListContainerState> {
  constructor(props: any) {
    super(props);
    this.state = {
        selectedList: this.props.selectedList || undefined,
        leftX: this.props.leftX || -1,    // -1 being undefined
        rightX: this.props.rightX || -1,  // -1 being undefined
    };
  }

  /**
   * FUNCTIONALITY: simply sets the selected list for the ListContainer.
   *                Note that this is public as it is to be provided to another component.
   * @param list ListHandler which is selected
   */
  public selectedListHandler(list: ListHandler) {
      this.setState({
          selectedList: list
      });
  }

  /**
   * RENDERING: renders a draggable pannel which changes the width of the sidebar
   */
  renderDraggablePanel = () : JSX.Element => {
    return (
      <Draggable
        axis='x'
        onDrag={(data: any) => {
          this.setState({rightX: data.clientX});
        }}
        scale={0}
      >
        <div className="resize-panel2" />
      </Draggable>
    );
  }

  render() {
      // // FIX: get the list container to adjust in size depending on the length of the sidebar.
      // const sidebarLength = document.getElementById('sidebar-container')?.clientWidth;
      return (
        <div id="list-container" className="list-container" style={{width: Math.max(this.state.rightX - this.props.sidebarReducer.width, 10)}}>
          <p>list-container</p>
          {this.renderDraggablePanel()}
        </div>
      );
  }
}

// Redux mapping to props
const mapStatesToProps = (state: any) => {
  const { sidebarReducer } = state;
  return {
    sidebarReducer
  };
}

export default connect(mapStatesToProps, null)(ListContainer);