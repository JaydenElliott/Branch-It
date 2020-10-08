import { render } from "@testing-library/react";
import React from "react";
import { Component } from "react";
import Todolist from "./components/todoList";
import TodoItems from "./components/todoItems";
class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="todolist">
            <h1>Todos</h1>
            <u1 className="list-unstyled">
              <Todolist />
            </u1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
