import React, { ChangeEvent } from "react";
import { Component } from "react";
// import { AppState } from "../App";


export interface ListState {
  // Local scope
  lists: TreevyList[];
  done: boolean;
  content: string;
}

// TODO: Make treevylist generate the items
class TreevyList extends Component<any, ListState> {
  constructor(props: ListState) {
    super(props);

    this.state = {
      lists: [],
      done: false,
      content: props.content ? props.content : ""
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      content: e.currentTarget.value
    })
  }

  submitItem = (_e: any): void => {
    _e.preventDefault();
    if (this.state.content == "") {
      return;
    }
  
    const list : ListState = {
      lists: [],
      done : false,
      content : this.state.content
    }

    
    this.state.lists.push(new TreevyList(list));
    this.setState({
      content: "",
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitItem}>
          <input
            type="text"
            value= {this.state.content}
            onChange={this.handleInputChange}
          >
          </input>
        </form>
        
        {this.state.lists.map((list, _) => {
          return <TreevyList content={list.state.content} />
        })}
      </div>
    );
  }
}

export default TreevyList;
