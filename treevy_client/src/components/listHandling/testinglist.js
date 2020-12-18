const Node = require("./NodeTest");

coord_adapter = (root_coordinate, coordinate, xscale, yscale) => {
  return [
    root_coordinate[0] + coordinate[0] * xscale,
    root_coordinate[1] + coordinate[1] * yscale,
  ];
};

var WIDTH = 2;
let root_coordinate = [1000, 100];
let xscale = 20;
let yscale = 50;

let node1 = new Node("task1", WIDTH, 1);
let node2 = new Node("task2", WIDTH, 2);
let node3 = new Node("task3", WIDTH, 3);
let node4 = new Node("task4", WIDTH, 4);
let node5 = new Node("task5", WIDTH, 5);

node1.append_node(node2);
node1.append_node(node3);

node1.append_node(node4);

node1.append_node(node5);

console.log(
  coord_adapter(root_coordinate, node1.compute_coordinate(), xscale, yscale)
);
console.log(
  coord_adapter(root_coordinate, node2.compute_coordinate(), xscale, yscale)
);
console.log(
  coord_adapter(root_coordinate, node3.compute_coordinate(), xscale, yscale)
);
console.log(
  coord_adapter(root_coordinate, node4.compute_coordinate(), xscale, yscale)
);
console.log(
  coord_adapter(root_coordinate, node5.compute_coordinate(), xscale, yscale)
);
