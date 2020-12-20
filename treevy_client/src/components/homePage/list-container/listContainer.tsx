import React, { ChangeEvent, Component } from "react";
import "../../../componentStyles/homePage/list-container/listContainer.css";
import ListHandler, { ListHandlerState } from "../../listHandling/listHandler";
import Draggable from "react-draggable";

/**
 * Defines the state for the ListContainer component
 */
interface ListContainerState {
    // Information about the selected list
    selectedList: ListHandler;
}
export default class ListContainer extends Component<any, ListContainerState> {
  constructor(props: any) {
    super(props);

    this.state = {
        selectedList: this.props.selectedList || undefined
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

  render() {
      // FIX: get the list container to adjust in size depending on the length of the sidebar.
      const sidebarLength = document.getElementById('sidebar-container')?.clientWidth;
      return (
        <div className="list-container" style={{width:(sidebarLength + "")}} />
      );
  }

}
