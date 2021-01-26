const initialState = { name: "", email: "", lists: [] };

const navPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "set/navWidth":
      state = {
        ...state,
        width: action.payload,
      };
      break;
    case "update/lists":
      state = {
        ...state,
        lists: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default navPageReducer;
