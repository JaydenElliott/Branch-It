// Defines the redux reducer for the todo lists
const initialState = {
    selected: undefined,
}
const todoReducer = (state = initialState, action: any) => {
    // Reducer actions
    switch(action.type) {
        case 'todo/select':
            state = {
                ...state,
                selected: action.payload,
            }
            break;
        default:
            break;
    }
    return state;
};

export default todoReducer;