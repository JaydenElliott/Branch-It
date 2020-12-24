import React, { ChangeEvent, Component } from "react";
import ListContainer from "./listContainer";
import SearchBar from "./searchContainer";
import SideMenuBar from "../side-container/sideMenuBar";

// Styling
import "../../../componentStyles/homePage/containers/content-container.css";

/**
 * Defines the state for the Containers component
 */
interface ContainersState {}
export default class ContentContainer extends Component<any, ContainersState> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  updateStates = (newState: any) => {
    Object.assign(this.state, newState);
  };

  render() {
    return (
      <div
        className="content-container"
        onClick={() => this.updateStates({ width: 100 })}
      >
        {/* <SearchBar /> */}
        {/* <ListContainer /> */}
        <SideMenuBar />
      </div>
    );
  }
}
