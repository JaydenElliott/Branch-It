import React, { Component } from "react";
import TodoItem from "./todoItem";

// kirupa todoapp template
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  addToDo = (item) => {
    this.state.items.push(item); 
  }

  render(){
    return(
      <ul className="todolist">
        {this.state.props.items.map}
      </ul>
    );

}

export default TodoList;
