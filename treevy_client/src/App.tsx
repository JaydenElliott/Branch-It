import React, { ChangeEvent } from "react";
import { Component } from "react";
import "./App.css";
import TreevyList, { ListState } from "./components/treevyList";
import Modal from "react-modal";
interface AppState {
  // Local scope
  listName: string;
  items: ListState[];

  modalShow: boolean;

  // list: TreevyList;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      listName: "",
      items: [],
      modalShow: false,
    };
  }

  // Keyboard input field
  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      listName: e.currentTarget.value,
    });
    console.log(this.state);
  };

  // On 'enter' push string to state.
  submitItem = (_e: any): void => {
    _e.preventDefault();
    if (this.state.listName == "") {
      return;
    }
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.listName,
    };

    const updatedItems = [...this.state.items, list];
    this.setState({
      items: updatedItems,
      listName: "",
    });
  };

  // Delete treevy list
  deleteList = (itemIndex: number) => {
    const updatedItems = this.state.items;
    updatedItems.splice(itemIndex, 1);
    this.setState({ items: updatedItems });
  };

  insertNode = () => {};

  setModalShow = (set: boolean) => {
    this.setState({
      modalShow: set,
    });
  };

  renderList = () => {
    return (
      <div id="listParent">
        {this.state.items.map((item, index) => (
          <TreevyList
            item={item}
            index={index}
            deleteList={this.deleteList}
            insertNode={this.insertNode}
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="center">
        <h2>To-Do List</h2>
        <form onSubmit={this.submitItem}>
          <input
            className="new-todo"
            type="text"
            onChange={this.onInputChange}
            value={this.state.listName}
          />
          <button id="submitBtn" type="submit"></button>
        </form>
        {this.renderList()}
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="modal-open-close">
  //       <button onClick={() => this.setModalShow(true)}>Open Modal</button>
  //       <Modal isOpen={this.state.modalShow}>
  //         <h2>Title</h2>
  //         <p>body</p>
  //         <button onClick={() => this.setModalShow(false)}>Close Modal</button>
  //       </Modal>
  //     </div>
  //   );
  // }
}

export default App;

// render(){
//   return (
// <RenderList
//         content={this.state.content}
//         childLists={this.state.lists}
//         onClickDel={this.onClickClose}
//       />
//   )
// }

// 1st: create button on treevy list that renders pop up with input
// - need to do this last
// 2nd: if list is created through initial app interface - give it layer 1
// 3rd: if list is created through pop up interface - give it layer parent + 1
//              - with item numeber, length + 1 of list[]
