import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import TreevyList from "./components/treevyList";

export interface TreevyModel {
  items: Array<string>;
}

interface AppState {
  // Local scope
  cstring: string;
  items: Array<string>;
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

  onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      cstring: e.currentTarget.value,
    });
  }

  submitItem(_e: any): void {
    _e.preventDefault();
    if (this.state.cstring == "") {
      return;
    }
    this.state.items.push(this.state.cstring);
    this.setState({
      cstring: "",
    });
  }

  render() {
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
            <TreevyList items={this.state.items} />
          </div>
        </div>
      </header>
    );
  }
}

export default App;
