import React, { ChangeEvent, Component } from "react";
import "../../../../componentStyles/homePage/side-container/nav-pages/listsMenu.css";
import TreevyList, { ListState } from "../../../listHandling/treevyList";
import ListOption from "./listOption";

// Redux
import { connect } from "react-redux";
import { setSelected, setLists } from "../../../../redux/actions/listsActions";


export interface ListsMenuState {
  // Input
  iString: string;

  // To-do lists
  displayedToDoLists: TreevyList[]; // To-do lists displayed to the user according to the search.

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
   * @param content name of list
   * @returns boolean true if successful, false otherwise
   */
  addList = (content: string): boolean => {
    // Ensure that the input string is not empty and that it is not contained already
    if (content === "") {
      this.feedback("You must provide a to-do list name");
      return false;
    }
    for (let list of this.props.lists) {
      if (list.content === content) {
        this.feedback(
          "That to-do list name already exists. You cannot have duplicate to-do list names"
        );
        return false;
      }
    }

    // Add list
    const state: ListState = {
      content: content,
      done: false,
      lists: [],
      location: [1, 0], // FIX: location should be based on other lists, currently it is fixed
      coordinates: undefined, //FIX: no coordinates
      width: 100, //FIX: should be proper.
    };

    const newList = new TreevyList(state);
    // To ensure alphabetic order, simply insert the newList in the correct sorted position.
    let pos = 0;
    while (
      pos < this.props.lists.length &&
      this.props.lists[pos].content.toLowerCase() <
        content.toLowerCase()
    ) {
      pos++;
    }
    let newLists = [...this.props.lists];
    newLists.splice(pos, 0, newList);

    // Alteratively, to sort the whole array:
    // const newLists = [...this.props.lists, newList];
    // newLists.sort((list1: TreevyList, list2: TreevyList) => {
    //   const list1Name = list1.content.toLowerCase();
    //   const list2Name = list2.content.toLowerCase();
    //   if (list1Name > list2Name) {
    //     return 1;
    //   } else if (list1Name < list2Name) {
    //     return -1;
    //   } else {
    //     return 0;
    //   }
    // })

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
      displayedToDoLists: this.props.lists.filter((list: TreevyList) => list.content.toLowerCase().includes(e.currentTarget.value.toLowerCase())),
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
          <li>{this.renderListOption(list)}</li>
        ))}
      </ul>
    );
  };

  /**
   * RENDERING: displays a button (in the side-search-bar) which can be
   *            pressed to select that particular list to display
   *            (in the list-container).
   *
   * @param listOption a displayed selectable list option
   */
  renderListOption = (listOption: TreevyList): JSX.Element => {
    return (
      <ListOption list={listOption} />
      // <button
      //   style={
      //     listOption === (this.props.selected ? this.props.selected : null)
      //       ? {
      //           fontSize: "2vh",
      //           textTransform: "none",
      //           display: "flex",
      //           margin: "4%",
      //           width: "90%",
      //           boxShadow: "none",
      //           backgroundColor: "#608C4C",
      //           borderColor: "black",
      //           color: "#ffffff",
      //         }
      //       : {
      //           fontSize: "2vh",
      //           textTransform: "none",
      //           display: "flex",
      //           margin: "4%",
      //           width: "90%",
      //         }
      //   }
      //   onClick={() => this.props.setSelected(listOption)}
      // >
      //   {listOption.content}
      // </button>
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
    setSelected: (selected: TreevyList | undefined | null) => {
      dispatch(setSelected(selected));
    },
    setLists: (lists: TreevyList[]) => {
      dispatch(setLists(lists));
    },
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(ListsMenu);
