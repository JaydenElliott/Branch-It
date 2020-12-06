import React, { ChangeEvent, Component } from "react";
import "../../../componentStyles/homePage/search-container/searchContainer.css";
import Button from "@material-ui/core/Button";

/**
 * Displays and handles search bar input changing as well as displaying the to-do lists.
 * Requires to-do lists to be provided as a prop.
 */
interface SearchBarState {
  // Search bar
  iString: string; // The input String

  // To-do lists
  selectedList: string;
  displayedToDoLists: string[]; // To-do lists displayed to the user according to the search
}
export default class SearchBar extends Component<any, SearchBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      iString: props.iString || "",

      selectedList: props.selectedList || "",
      displayedToDoLists: this.props.toDoLists
    };
  }

  /**
   *
   * FUNCTIONALITY: SEARCH BAR
   *
   * Changes the provided search contents to represent the search.
   * @param e current input
   */
  onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // If the to-do lists prop was not provided, do nothing.
    if (this.state.displayedToDoLists === undefined) return;

    // Finds all lists containing the searched word
    let newDisplayedList: string[] = [];
    this.props.toDoLists.forEach((toDo: string) => {
      // To ensure that the search is not case sensitive, both are set to lower case.
      if (toDo.toLowerCase().includes(e.currentTarget.value.toLowerCase())) {
        newDisplayedList.push(toDo);
      }
    });

    // Sets new displayed lists
    this.setState({
      displayedToDoLists: newDisplayedList,
    });
  };

  /**
   *
   * FUNCTIONALITY: SEARCH BAR
   *
   * Displays the user's to-do lists given the current search input.
   */
  displayToDoLists = (): JSX.Element | void => {
    // If the to-do list is not provided, do nothing.
    if (this.state.displayedToDoLists === undefined) return;

    return (
      <nav>
        <ul style={{ marginLeft: "auto", marginRight: "auto" }}>
          {this.state.displayedToDoLists.map((list) => (
            <li>{this.renderListOption(list)}</li>
          ))}
        </ul>
      </nav>
    );
  };

  /**
   * Renders the side bar container
   */
  renderSideBar = () => {
    return (
      <div className="sidebar-container">
        {this.renderSearch()}
        {this.displayToDoLists()}
      </div>
    );
  };

  /**
   * RENDERING: displays a button (in the side-search-bar) which can be
   *            pressed to select that particular list to display
   *            (in the list-container).
   *
   * @param listOption a displayed selectable list option
   */
  renderListOption = (listOption: string): JSX.Element => {
    return (
      <Button
        disableRipple
        variant="contained"
        style={
          listOption === this.state.selectedList
            ? {
                fontSize: "2vh",
                textTransform: "none",
                display: "flex",
                margin: "4%",
                width: "20vw",
                boxShadow: "none",
                backgroundColor: "#608C4C",
                borderColor: "black",
                color: "#ffffff",
              }
            : {
                fontSize: "2vh",

                textTransform: "none",
                display: "flex",
                margin: "4%",
                width: "20vw",
              }
        }
        onClick={() => this.setState({ selectedList: listOption })}
      >
        {listOption}
      </Button>
    );
  };

  /**
   * RENDERING: renders search bar
   */
  renderSearch = () : JSX.Element => {
    return (
      <div className="side-search-bar">
        <input
          id="search-bar"
          type="input"
          className="search-bar"
          placeholder="Search"
          onChange={this.onSearchChange}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="sidebar-container">
        {this.renderSearch()}
        {this.displayToDoLists()}
      </div>
    );
  }
}
