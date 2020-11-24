import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import TreevyList, { ListState } from "./components/treevyList";

interface AppState {
  // Local scope
  cstring: string;
  items: ListState[];
  // list: TreevyList;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      cstring: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.submitItem = this.submitItem.bind(this);
  }

  // Keyboard input field
  onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      cstring: e.currentTarget.value,
    });
  }

  // On 'enter' push string to state.
  submitItem(_e: any): void {
    _e.preventDefault();
    if (this.state.cstring == "") {
      return;
    }
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.cstring,
    };

    const updatedItems = [...this.state.items, list];
    this.setState({
      items: updatedItems,
      cstring: "",
    });
  }

  render() {
    const renderList = () => {
      /* Only call this is there is content to display */
      if (this.state.items.length != 0) {
        return <TreevyList items={this.state.items} />;
      }
    };
    return (
      <header className="header">
        <div className="todoapp">
          <div className="center">
            <h2>To-Do List</h2>
            <form onSubmit={this.submitItem}>
              <input
                className="new-todo"
                type="text"
                onChange={this.onInputChange}
                value={this.state.cstring}
              />
              <button className="button" type="submit" />
            </form>
            {renderList()}
          </div>
        </div>
      </header>
    );
  }
}

export default App;
