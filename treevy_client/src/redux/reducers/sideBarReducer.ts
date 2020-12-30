// Defines the redux reducer for the sidebar
const initialState = {
  width: 0,
};
const sidebarReducer = (state = initialState, action: any) => {
  // Reducer actions
  switch (action.type) {
    case "sidebar/resize":
      state = {
        ...state,
        width: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default sidebarReducer;
