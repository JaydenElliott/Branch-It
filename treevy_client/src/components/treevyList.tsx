import React from "react";
import { Component } from "react";
import ItemState from "./treevyItem";
import treevyItem from "./treevyItem"
// import { AppState } from "../App";


export interface ListState {
  // Local scope
  items: Array<treevyItem>;
}

}
class TreevyList extends Component<{}, ListState> {
  constructor(props: ListState) {
    super(props);

    this.state = {
      items: []
    }

    this.createItem = this.createItem.bind(this);

  }

  // Creates an item node - from treevyItem.tsx
  createItem(itemState: ItemState) : boolean {
    const item : treevyItem = new treevyItem(itemState);
    this.state.items.push(item);
    return true;
  }


  render() {
    return (
      <div>
        <ul>
          {this.state.items.map((item, _) => {
            return <li>{item.state.content}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default TreevyList;
