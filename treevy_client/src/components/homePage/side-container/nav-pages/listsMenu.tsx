import React, { ChangeEvent, Component } from "react";
import "../../../../componentStyles/homePage/side-container/nav-pages/listsMenu.css";
import TreevyList, { ListState } from "../../../listHandling/treevyList";
import ListContainer from "../../../listHandling/listContainer";
import ListOption from "./listOption";

// Redux
import { connect } from "react-redux";
import { setLists } from "../../../../redux/actions/listsActions";

export interface ListsMenuState {
  // Input
  iString: string;

  // To-do lists
  displayedToDoLists: ListContainer[]; // To-do lists displayed to the user according to the search.

  // User feedback
  feedback: string;
}
class ListsMenu extends Component<any, ListsMenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      iString: props.iString || "",
      displayedToDoLists: props.displayedToDoLists || this.props.lists || [],
      feedback: props.feedback || "",
    };
  }

  /**
   * RENDERING: renders search bar, add button and feedback to the user
   */
  renderSearch = (): JSX.Element => {
    return (
      <div>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            this.addList(this.state.iString);
          }}
        >
          <input
            type="input"
            className="search-bar"
            placeholder="Search or Add"
            onChange={this.onSearchChange}
            value={this.state.iString}
          />
        </form>
        <div className="feedback">{this.state.feedback}</div>
      </div>
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
   * @param name name of list
   * @returns boolean true if successful, false otherwise
   */
  addList = (name: string): boolean => {
    // Ensure that the input string is not empty and that it is not contained already
    if (name === "") {
      this.feedback("You must provide a to-do list name");
      return false;
    }
    for (let list of this.props.lists) {
      if (list.name === name) {
        this.feedback(
          "That to-do list name already exists. You cannot have duplicate to-do list names"
        );
        return false;
      }
    }

    // Graph settings (make this modular - maybe settings file later)
    const WIDTH = 2;
    const root_coordinate = [400, 50];

    /**
     * An invisible node is required for the graph generation
     * All the actual "root" lists need a parent to align themselves with
     *
     */
    const invisibleRootNodeAttributes: ListState = {
      lists: [],
      done: false,
      content: "",
      location: [0, 0],
      coordinates: root_coordinate,
      width: WIDTH,
      parent: undefined,
    };
    const rootNode = new TreevyList(invisibleRootNodeAttributes);

    let newListContainer = new ListContainer(name, [rootNode], []);

    // To ensure alphabetic order, simply insert the newList in the correct sorted position.
    let pos = 0;
    while (
      pos < this.props.lists.length &&
      this.props.lists[pos].name.toLowerCase() < name.toLowerCase()
    ) {
      pos++;
    }
    let newLists = [...this.props.lists];
    newLists.splice(pos, 0, newListContainer);

    // Update redux
    this.props.setLists(newLists);
    // Update local
    this.setState({
      iString: "",
      displayedToDoLists: newLists,
      feedback: "", // Set feedback to nothing
    });

    return true;
  };

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
      this.props.lists === undefined
    )
      return;

    // Sets new displayed lists
    this.setState({
      // Finds all lists containing the searched word
      displayedToDoLists: this.props.lists.filter((list: ListContainer) =>
        list.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      ),
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
      this.props.lists === undefined
    )
      return;

    return (
      <ul className="todo-list-container">
        {this.state.displayedToDoLists.map((list) => (
          <li>
            {<ListOption list={list} menuToggle={this.props.menuToggle} />}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <div className="nav-pages-lists">
        {this.renderSearch()}
        {this.displayToDoLists()}
      </div>
    );
  }
}

// Redux mapping to props
const mapStatesToProps = (state: any) => {
  const { selected, lists } = state.listsReducer;
  return {
    selected,
    lists,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLists: (lists: ListContainer[]) => {
      dispatch(setLists(lists));
    },
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(ListsMenu);
