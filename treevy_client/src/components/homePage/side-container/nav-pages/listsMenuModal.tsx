import React, { Component } from "react";

import "../../../../componentStyles/homePage/side-container/nav-pages/listsMenuModal/listsMenuModal.css";
import closeWindow from "../../../../componentStyles/homePage/side-container/nav-pages/listsMenuModal/closeWindow.svg";
import plusCircle from "../../../../componentStyles/homePage/side-container/nav-pages/listsMenuModal/plusCircle.svg";

export default class ListsMenuModal extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="temp-lists-container">
        <div className="modal-window">
          <div className="close-window-container">
            <button className="close-window-button">
              <img src={closeWindow} />
            </button>
          </div>
          <div className="list-content">{this.props.list.content}</div>
          <div className="description-title">Description</div>
          <div className="description-container">
            <div className="description">
              Finishing treevy requires firstly finishing the UI and then
              completing the API.
            </div>
          </div>
          <div className="child-lists-title">Child Lists</div>
          <div className="child-lists-container">
            <div className="child-lists">[Finish UI, APIs, setup database]</div>
          </div>
          <div className="add-child-list-container">
            <button className="add-child-list-button">
              <img src={plusCircle} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
