import React, { ChangeEvent, Component } from "react";
import "./homePageButtonsCSS/searchBar.css";

/**
 * Displays and handles search bar input changing.
 * Requires parent to handle input functionality.
 */
interface SearchBarState {
  iString: string; // The input String
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void; // Method which deals with input
}
export default class SearchBar extends Component<any, SearchBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      iString: props.iString || "",
      handleChange: props.handleChange,
    };
  }

  /**
   * FUNCTIONALITY: Sends input string value to parent componenet
   *                handles the changing of input string state here.
   *
   * @param e current input
   */
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.state.handleChange(e);
    this.setState({
      iString: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div className="side-search-bar">
        <input
          id="search-bar"
          type="input"
          className="search-bar"
          placeholder="Search"
          onChange={this.handleChange}
          style={{ width: "80%", fontSize: "16px" }}
        />
      </div>
    );
  }
}
