import TreevyList from "./treevyList";

/**
 * Class is used to store the root properties of a to-do list.
 * Using this, lists can be switched between.
 */
export default class ListContainer {
    public name: string = "";
    public items: TreevyList[] = [];
    public flowJson: any[] = [];
    public done: boolean = false;

    constructor(name: string, items: TreevyList[], flowJson: any[], done: boolean = false) {
        this.name = name;
        this.items = items;
        this.flowJson = flowJson;
        this.done = done;
    }
}