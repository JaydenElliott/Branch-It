import React, { ChangeEvent, Component } from "react";
import "../../../componentStyles/homePage/search-container/searchContainer.css";
import ListHandler, { ListHandlerState } from "../../listHandling/listHandler";

// Button
import Button from "@material-ui/core/Button";

/**
 * Displays and handles search bar input changing as well as displaying the to-do lists.
 * Requires to-do lists to be provided as a prop.
 */
interface SearchBarState {
  // Search bar
  iString: string; // The input String

  // To-do lists
  selectedList: ListHandler;
  toDoLists: ListHandler[];
  displayedToDoLists: ListHandler[]; // To-do lists displayed to the user according to the search
}
export default class SearchBar extends Component<any, SearchBarState> {
  constructor(props: any) {
    super(props);

    this.state = {
      iString: props.iString || "",

      toDoLists: this.props.toDoLists || [],
      selectedList: props.selectedList,
      displayedToDoLists: this.props.toDoLists || [],
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
    if (this.state.displayedToDoLists === undefined || this.state.toDoLists === undefined) return;

    // Finds all lists containing the searched word
    let newDisplayedList: ListHandler[] = [];
    this.state.toDoLists.forEach((toDo: ListHandler) => {
      // To ensure that the search is not case sensitive, both are set to lower case.
      if (toDo.state.listName.toLowerCase().includes(e.currentTarget.value.toLowerCase())) {
        newDisplayedList.push(toDo);
      }
    });

    // Sets new displayed lists
    this.setState({
      displayedToDoLists: newDisplayedList,
      iString: e.currentTarget.value
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
    if (this.state.displayedToDoLists === undefined || this.state.toDoLists === undefined) return;

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
  renderListOption = (listOption: ListHandler): JSX.Element => {
    return (
      <Button
        disableRipple
        variant="contained"
        style={
          listOption === (this.state.selectedList ? this.state.selectedList : null)
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
        {listOption.state.listName}
      </Button>
    );
  };

  /**
   * FUNCTIONALITY: displays a toast to the user
   * @param message string to be displayed to the user
   */
  toast = (message: string) : void => {
    // Attempt to obtain the toast element. If you are unable to, return.
    const to : any | null = document.getElementById("toast");
    if (to === null) return;

    // Set the toast value and display it
    to.innerHTML  = message;
    to.className = "show";

    // Displaying only for 3 seconds
    setTimeout(function(){ to.className = to.className.replace("show", ""); }, 3000);
  }

  /**
   * FUNCTIONALITY: adds a list to the state if it does not already exist
   * @param listName name of list
   * @returns boolean true if successful, false otherwise
   */
  addList = (listName : string) : boolean => {
    // Ensure that the input string is not empty and that it is not contained already
    if (listName === "") {
      this.toast("You must provide a to-do list name")
      return false;
    }
    for (let list of this.state.toDoLists) {
      this.toast("That to-do list name already exists. You cannot have duplicate to-do list names")
      if (list.state.listName === listName) return false;
    }

    // Add list
    const state : ListHandlerState = {
      listName: listName,
      items: []
    }

    const newList = new ListHandler(state);
    this.setState({
      displayedToDoLists: [...this.state.displayedToDoLists, newList],
      toDoLists: [...this.state.toDoLists, newList]
    })

    return true;
  }

  /**
   * RENDERING: renders the add button
   */
  renderAddButton = () : JSX.Element => {
    return (
      <button
        className="add-button"
        onClick={() => this.addList(this.state.iString)}
      >
        Add
      </button>
    );
  }

  /**
   * RENDERING: renders search bar
   */
  renderSearch = () : JSX.Element => {
    return (
      <div 
        className="sidebar-top-div"
      >
        <form
          className="side-search-bar"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <input
            id="search-bar"
            type="input"
            className="search-bar"
            placeholder="Search or Add"
            onChange={this.onSearchChange}
          />
          {this.renderAddButton()}
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="sidebar-container">
        {this.renderSearch()}
        {this.displayToDoLists()}
        <div id="toast">Error</div>
      </div>
    );
  }
}
