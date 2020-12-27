import ListHandler from "../../components/listHandling/listHandler";

// Defines the redux reducer for to-do lists.
interface ListsState {
    selected: ListHandler | undefined | null,
    lists: ListHandler[],
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
        default:
            break;
    }

    return state;
}

export default listsReducer;