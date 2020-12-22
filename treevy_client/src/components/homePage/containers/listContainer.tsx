import React, { Component } from "react";
import "../../../componentStyles/homePage/containers/listContainer.css";
import ListHandler, { ListHandlerState } from "../../listHandling/listHandler";
import Draggable from "react-draggable";

/**
 * Defines the state for the ListContainer component
 */
interface ListContainerState {
    // Information about the selected list
    selectedList: ListHandler;

    // Left and right coordinates in pixels
    leftX: number;
    rightX: number;
}
export default class ListContainer extends Component<any, ListContainerState> {
  // Reference to self
  private myRef: React.RefObject<HTMLInputElement>;
  
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
    let initialX : number | undefined = document.getElementById('sidebar-container')?.clientWidth;

    this.state = {
        selectedList: this.props.selectedList || undefined,
        leftX: initialX || -1,            // -1 being undefined
        rightX: this.props.rightX || -1,  // -1 being undefined
    };
  }

  componentDidMount() {
    // Sets an event listener to resize upon the sidebar container resizing.
    let sidebar = document.getElementById('sidebar-container');
    if (sidebar)
      this.setState({leftX: sidebar.clientWidth});
    sidebar?.addEventListener('resize', () => {
      // alert('what')
      let leftX = sidebar?.clientWidth;
      this.setState({
        leftX: leftX || -1
      })
    })

    // Set rightX
    const myNode: any = this.myRef.current;
    if (myNode !== null)
      this.setState({rightX: myNode.clientWidth});
  }

  /**
   * FUNCTIONALITY: simply sets the selected list for the ListContainer.
   *                Note that this is public as it is to be provided to another component.
   * @param list ListHandler which is selected
   */
  public selectedListHandler(list: ListHandler) {
      this.setState({
          selectedList: list
      });
  }

  /**
   * RENDERING: renders a draggable pannel which changes the width of the sidebar
   */
  renderDraggablePanel = () : JSX.Element => {
    const myNode: any = this.myRef.current;
    return (
      <Draggable
        axis='x'
        onDrag={(data: any) => {
          this.setState({rightX: data.clientX})
          // Informs other elements that this element has been resized.
          if (myNode !== null)
            myNode.dispatchEvent(new Event('resize'))
        }}
        scale={0}
      >
        <div className="resize-panel2" />
      </Draggable>
    );
  }

  render() {
      // // FIX: get the list container to adjust in size depending on the length of the sidebar.
      // const sidebarLength = document.getElementById('sidebar-container')?.clientWidth;
      return (
        <div id="list-container" className="list-container" ref={this.myRef} style={{width: Math.max(this.state.rightX - this.state.leftX, 10)}}>
          <p>list-container</p>
          {this.renderDraggablePanel()}
        </div>
      );
  }

}
