import ListContainer from "../../components/listHandling/listContainer";

// Defines the redux reducer for to-do lists.
interface ListsState {
    selected: ListContainer | undefined | null,
    lists: ListContainer[],
}
const listsReducer = (state: ListsState = {
    selected: undefined,
    lists: [],
}, action: any) => {
    // Reducer actions
    switch(action.type) {
        // Changes selected list
        case 'lists/select':
            state = {
                ...state,
                selected: action.payload,
            }
            break;
        // Changes the lists
        case 'lists/update':
            state = {
                ...state,
                lists: action.payload,
            }
            break;
        
        // Updates the currently selected
        case 'selected/update':
            if (state.selected !== null && state.selected !== undefined) {
                // Find index of currently selected in order to change it
                const index = state.lists.indexOf(state.selected);
                state = {
                    ...state,
                    lists: [
                        // Maintaining all other lists while immutably changing the selected
                        ...state.lists.slice(0, index),
                        action.payload,
                        ...state.lists.slice(index + 1)
                    ],
                    selected: action.payload
                }
            }
            break;
        default:
            break;
    }

    return state;
}

export default listsReducer;