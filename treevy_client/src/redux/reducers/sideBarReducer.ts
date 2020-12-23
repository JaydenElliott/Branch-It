// Defines the redux reducer for the sidebar
const initialState = {
    width: 0,
}
const sideBarReducer = (state = initialState, action: any) => {
    // Reducer actions
    switch(action.type) {
        case 'sideBar/resize':
            state = {
                ...state,
                width: state.width + action.payload,
            }
            break;
        default:
            break;
    }
    return state;
};

export default sideBarReducer;