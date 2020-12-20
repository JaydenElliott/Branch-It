import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";

const elements2 = [
  { id: "1", data: { label: "t1" }, position: { x: 1000, y: 100 } }, // node 1`
  { id: "2", data: { label: "t2" }, position: { x: 580, y: 200 } }, // node 2
  { id: "3", data: { label: "t3" }, position: { x: 1420, y: 200 } }, // node 2
  { id: "4", data: { label: "t4" }, position: { x: 1320, y: 300 } }, // node 2
  { id: "5", data: { label: "t5" }, position: { x: 1520, y: 300 } }, // node 2
  { id: "6", data: { label: "t6" }, position: { x: 320, y: 300 } }, // node 2
  { id: "7", data: { label: "t7" }, position: { x: 500, y: 300 } }, // node 2
  { id: "8", data: { label: "t8" }, position: { x: 660, y: 300 } }, // node 2
  { id: "9", data: { label: "t9" }, position: { x: 840, y: 300 } }, // node 2

  { id: "e1-2", source: "1", target: "2", animated: false }, // edge
  { id: "e1-3", source: "1", target: "3", animated: false }, // edge
];

const graphStyles = { width: "100%", height: "500px" };

// const BasicGraph = () => (
//   <ReactFlow
//     elements={elements}
//     style={graphStyles}
//     nodesDraggable={false}
//     nodesConnectable={false}
//   />
// );

// [item id, layer, parentid]
// [1,1,0] if root

// if nmbr of elements already in are even, then append to left, else right
let arblist2 = [
  [1, 1, 0, "parent"],
  [2, 2, 1, "child1"],
  [3, 2, 1, "child2"],
  [4, 2, 1, "child3"],
  [5, 2, 1, "child4"],
];

export default class TestingGrounds extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  elementGen = () => {
    let elements2: any = [];

    let arblist: any[] = [
      [1, 1, 0, "parent"],
      [2, 2, 1, "child1"],
      [3, 2, 1, "child2"],
      [4, 2, 1, "child3"],
    ];

    let layer1Count = 0;
    let layer2Count = 0;
    for (let i = 0; i < arblist.length; i++) {
      let id_node = arblist[i][0];
      let layer = arblist[i][1];
      let parent = arblist[i][2];
      let content = arblist[i][3];

      let xCoord: number;
      let yCoord: number;

      yCoord = 150 + layer * 50;
      if (layer == 1) {
        layer1Count++;
        if (id_node % 2 == 0) {
          xCoord = 200 + 100 * layer1Count;
        } else {
          xCoord = 200 - 100 * layer1Count;
        }
      } else {
        layer2Count++;
        if (id_node % 2 == 0) {
          xCoord = 200 + 50 * layer2Count;
        } else {
          xCoord = 200 - 50 * layer2Count;
        }
      }

      elements2.push({
        id: id_node.toString(),
        data: { label: content },
        position: { x: xCoord, y: yCoord },
      });
    }

    return elements2;
  };

  testing2 = (subelem: any) => {
    return (
      <div>
        ID = {subelem["id"]} , CONTENT = {subelem["data"]["label"]}{" "}
      </div>
    );
  };
  testing = (id: any, content: any, coords: any) => {
    return (
      <div>
        {id}, {content}, {coords["x"]}, {coords["y"]}
      </div>
    );
  };

  setCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count);
  };

  render() {
    let elements3 = this.elementGen();
    return (
      // <div style={{ width: "100vw", height: "100vh" }}>
      //   {/* {elements3.map((value: any, _: any) => {
      //     let id = value["id"];
      //     let content = value["data"]["label"];
      //     let coords = value["position"];
      //     return this.testing(id, content, coords);
      //   })} */}

      //   <ReactFlow
      //     elements={elements2}
      //     style={graphStyles}
      //     nodesDraggable={true}
      //     nodesConnectable={false}
      //   />
      // </div>

      <div>
        <button onClick={this.setCount}>test</button>
      </div>
    );
  }
}
