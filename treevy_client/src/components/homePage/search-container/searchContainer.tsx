import React, { ChangeEvent, Component } from "react";
import "../../../componentStyles/homePage/search-container/searchContainer.css";
import ListHandler, { ListHandlerState } from "../../listHandling/listHandler";
import Draggable from "react-draggable";

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
  selectedListHandler: (list: ListHandler) => void; // list-container method which deals with rendering the selected to-do list.
  toDoLists: ListHandler[];
  displayedToDoLists: ListHandler[]; // To-do lists displayed to the user according to the search.

  // User feedback
  feedback: string;

  // Size
  width: number;
}
export default class SearchBar extends Component<any, SearchBarState> {
  // Reference to self
  private myRef: React.RefObject<HTMLInputElement>;
  
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      iString: props.iString || "",

      toDoLists: this.props.toDoLists || [],
      selectedList: props.selectedList,
      selectedListHandler: props.selectedListHandler || ((list: ListHandler) => {alert('Please provide list selectedListHanlder to searchContainer')}),
      displayedToDoLists: this.props.toDoLists || [],

      
      feedback: "",

      width: -1

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
    if (
      this.state.displayedToDoLists === undefined ||
      this.state.toDoLists === undefined
    )
      return;

    // Finds all lists containing the searched word
    let newDisplayedList: ListHandler[] = [];
    this.state.toDoLists.forEach((toDo: ListHandler) => {
      // To ensure that the search is not case sensitive, both are set to lower case.
      if (
        toDo.state.listName
          .toLowerCase()
          .includes(e.currentTarget.value.toLowerCase())
      ) {
        newDisplayedList.push(toDo);
      }
    });

    // Sets new displayed lists
    this.setState({
      displayedToDoLists: newDisplayedList,
      iString: e.currentTarget.value,
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
    if (
      this.state.displayedToDoLists === undefined ||
      this.state.toDoLists === undefined
    )
      return;

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
          listOption ===
          (this.state.selectedList ? this.state.selectedList : null)
            ? {
                fontSize: "2vh",
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
                fontSize: "2vh",

                textTransform: "none",
                display: "flex",
                margin: "4%",
                width: "90%",
              }
        }
        onClick={() => this.setState({ selectedList: listOption })}
      >
        {listOption.state.listName}
      </Button>
    );
  };

  /**
   * FUNCTIONALITY: displays a feedback to the user
   * @param message string to be displayed to the user
   */
  feedback = (message: string): void => {
    // Feedback message set
    this.setState({
      feedback: message,
    });

    // Display the feedback for only 20 seconds
    setTimeout(() => this.setState({ feedback: "" }), 10000);
  };

  /**
   * FUNCTIONALITY: adds a list to the state if it does not already exist
   * @param listName name of list
   * @returns boolean true if successful, false otherwise
   */
  addList = (listName: string): boolean => {
    // Ensure that the input string is not empty and that it is not contained already
    if (listName === "") {
      this.feedback("You must provide a to-do list name");
      return false;
    }
    for (let list of this.state.toDoLists) {
      if (list.state.listName === listName) {
        this.feedback(
          "That to-do list name already exists. You cannot have duplicate to-do list names"
        );
        return false;
      }
    }

    // Add list
    const state: ListHandlerState = {
      listName: listName,
      items: [],
    };

    const newList = new ListHandler(state);
    this.setState({
      displayedToDoLists: [...this.state.displayedToDoLists, newList],
      toDoLists: [...this.state.toDoLists, newList],
      feedback: "", // Set feedback to nothing
    });

    return true;
  };

  /**
   * RENDERING: renders the add button
   */

  renderAddButton = () : JSX.Element | null => {
    return (
      // Only render the button if the width is big enough to fit it.
      this.state.width === -1 || this.state.width > 10 ?
        <button
          className="add-button"
          onClick={() => this.addList(this.state.iString)}
        >
          Add
        </button>
      :
        null
    );
  };

  /**
   * RENDERING: renders search bar, add button and feedback to the user
   */
  renderSearch = (): JSX.Element => {
    return (
      <div className="sidebar-top-div">
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
        <div className="feedback">{this.state.feedback}</div>
      </div>
    );
  };

  /**
   * RENDERING: renders a draggable pannel which changes the width of the sidebar
   */
  renderDraggablePanel = () : JSX.Element => {
    const myNode: any = this.myRef.current;
    return (
      <Draggable
        axis='x'
        onDrag={(data: any) => {
          this.setState({width: data.clientX})
          // Informs other elements that this element has been resized.
          if (myNode !== null)
            myNode.dispatchEvent(new Event('resize'))
        }}
        scale={0}
      >
        <div className="resize-panel" />
      </Draggable>
    );
  }

  render() {
    // Render at the resized width or the given
    if (this.state.width === -1) {
      return (
        <div id="sidebar-container" className="sidebar-container" ref={this.myRef}>
          {this.renderSearch()}
          {this.displayToDoLists()}
          {this.renderDraggablePanel()}
        </div>
      );
    } else {
      return (
        <div id="sidebar-container" className="sidebar-container" style={{width: this.state.width}} ref={this.myRef}>
          {this.renderSearch()}
          {this.displayToDoLists()}
          {this.renderDraggablePanel()}
        </div>
      );
    }
  }
}
