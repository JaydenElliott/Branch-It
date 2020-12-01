// Project Imports
import React, { ChangeEvent, Component } from "react";
import "../styles/page-styles/homePage.css";

// Button & Icons
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import EcoIcon from "@material-ui/icons/Eco";
import logo from "../logo/templogo.svg";

// Search Bar
import TextField from "@material-ui/core/TextField";

// Log-in Dialog (modal)
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//

// Defines the layout pallete for the different UI elements.
const pallete = {
  // Image pallete
  imgFill: "#608C4C",

  // Standard button pallete
  buttonBackgroundColour: "#608C4C",
  buttonTextColour: "#ffffff",
  buttonHeight: "80%",
  buttonVariant: "contained",

  // Premium pallete
  permiumButtonColour: "#2196f3",
};

interface HomePageState {
  sString: string; // Search string
  displayedToDoLists: string[]; // To-do lists displayed to the user according to the search
  modalOpen: boolean;
}

export default class HomePage extends Component<any, HomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      sString: "",
      displayedToDoLists: this.props.toDoLists,
      modalOpen: false,
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
    const currentSearch: string = e.currentTarget.value;
    this.props.toDoLists.forEach((toDo: string) => {
      // To ensure that the search is not case sensitive, both are set to lower case.
      if (toDo.toLowerCase().includes(currentSearch.toLowerCase())) {
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
      <div>
        {this.state.displayedToDoLists.map((list) => (
          <div>{list}</div>
        ))}
      </div>
    );
  };

  /**
   *
   * FUNCTIONALITY: LOG-IN BUTTON - Modal
   *
   * Modal open and close state manipulation
   */
  modalClickOpen = () => {
    this.setState({
      modalOpen: true,
    });
  };
  modalClickClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    return (
      <div className="grid-container">
        <div className="topbar-container">
          {/* Search bar */}
          <form
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
            style={{ height: "100%" }}
          >
            <TextField
              id="search-bar"
              placeholder="Search"
              variant="filled"
              size="small"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                style: {
                  fontSize: "large",
                  fontFamily: "handWritten",
                },
              }}
              onChange={this.onSearchChange}
              style={{ width: "221%", minHeight: "10px" }}
            ></TextField>
          </form>

          <div className="top-logo">
            <img src={logo} style={{ fill: "#608c4c" }} />
          </div>
          <div className="Blank" />
          <div className="Blank" />
          <div className="Save">
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              style={{
                backgroundColor: "#608C4C",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Save
            </Button>
          </div>
          <div className="Title">Treevy</div>
          <div className="Share">
            <Button
              startIcon={<ShareIcon />}
              variant="contained"
              style={{
                backgroundColor: "#608C4C",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Share
            </Button>
          </div>
          <div className="Maple">
            <Button
              startIcon={<EcoIcon />}
              variant="contained"
              style={{
                backgroundColor: "#2196f3",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Maple
            </Button>
          </div>
          <div className="Log-in">
            <Button
              startIcon={<PersonIcon />}
              onClick={this.modalClickOpen}
              variant="contained"
              style={{
                backgroundColor: "#608C4C",
                height: "80%",
                color: "#ffffff",
              }}
            >
              Log-in
            </Button>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Dialog
                open={this.state.modalOpen}
                onClose={this.modalClickClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  <span style={{ fontSize: "25px" }}>Welcome Back</span>
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    inputProps={{
                      style: {
                        fontSize: "large",
                      },
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    fullWidth
                    inputProps={{
                      style: {
                        fontSize: "large",
                      },
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.modalClickClose}>Cancel</Button>
                  <Button onClick={this.modalClickClose}>Log-in</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="sidebar-container">
            {this.displayToDoLists()}
            <div className="side-search-bar">
              {/* <input type="text" id="keyboardInput" /> */}
            </div>
          </div>
          <div className="list-container"></div>
          <div className="graph-container"></div>
        </div>
      </div>
    );
  }
}
