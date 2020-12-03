import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import "./homePageButtonsCSS/searchBar.css";

export default class SearchBar extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      displayedToDoLists: this.props.toDoLists,
      selectedList: "",
    };
  }

  render() {
    return <div></div>;
  }
}
