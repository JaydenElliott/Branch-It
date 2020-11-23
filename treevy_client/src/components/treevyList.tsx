import React, { ChangeEvent } from "react";
import { Component } from "react";
import "../components/test.css";
// import { AppState } from "../App";
import RenderList from "../components/renderItem";

export interface ListState {
  // Local scope
  lists: TreevyList[];
  done: boolean;
  content: string;
}

class TreevyList extends Component<any, ListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      lists: this.props.item.lists,
      done: this.props.item.done,
      content: this.props.item.content,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      content: e.currentTarget.value,
    });
  };

  deleteItem(e: number) {
    this.props.deleteList(e);
  }

  onClickClose = () => {
    var index = parseInt(this.props.index);
    this.deleteItem(index);
  };

  submitItem = (_e: any): void => {
    _e.preventDefault();
    if (this.state.content == "") {
      return;
    }

    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.content,
    };

    this.state.lists.push(new TreevyList(list));
    this.setState({
      content: "",
    });
  };

  /**
   * Renders all the child lists 'content'
   */
  renderChildList = () => {
    let itemList = [];
    for (let i = 0; i < this.state.lists.length; i++) {
      itemList.push(<li>{this.state.lists[i].state.content}</li>);
    }
    return itemList;
  };

  render() {
    return (
      <div>
        <RenderList
          content={this.state.content}
          onClickDel={this.onClickClose}
        />
      </div>
    );
  }
}

export default TreevyList;

// render() {
//   return (
//     <div>
//       <ul>
//         {this.state.content}
//         <button type="button" className="close" onClick={this.onClickClose}>
//           &times;
//         </button>
//       </ul>
//     </div>
//   );
// }
