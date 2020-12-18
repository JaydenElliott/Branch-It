/**
 * Class object to store list attributes
 */

export interface ListState {
  // Local scope
  lists: TreevyList[];
  done: boolean;
  content: string;
  location: [number, number]; // [layer, item # in layer]
  coordinates: [number, number];
  parent?: any;
}
class TreevyList {
  constructor(listDetails: ListState) {
    this.lists = listDetails.lists;
    this.done = listDetails.done;
    this.content = listDetails.content;
    this.location = listDetails.location;
    this.coordinates = listDetails.coordinates;
    this.parent = listDetails.parent;
    this.tempString = "";
  }
  lists: any;
  done: boolean;
  content: string;
  location: any;
  coordinates: any;
  parent: TreevyList;
  tempString: string;
}

export default TreevyList;
