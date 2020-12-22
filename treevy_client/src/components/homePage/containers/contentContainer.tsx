import React, { ChangeEvent, Component } from "react";
import ListContainer from "./listContainer";
import SearchBar from "./searchContainer";

/**
 * Defines the state for the Containers component
 */
interface ContainersState {

}
export default class ContentContainer extends Component<any, ContainersState> {
    constructor(props: any) {
        super(props);

        this.state = {

        };
    }

    updateStates = (newState: any) => {
        Object.assign(this.state, newState);
    }

    render() {
        return (
            <div className="content-container" onClick={() => this.updateStates({width:100})}>
                <SearchBar />
                <ListContainer />
            </div>
        );
    }
}