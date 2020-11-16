import React from "react";
import { Component } from "react";


export interface ItemState {
  done: boolean,
  content: string
}

export default class treevyItem extends Component<{},ItemState> {
  constructor(props: any) {
    super(props);

    this.state = {
      done: false,
      content: "",
    };
  }
}
