const initialState = { width: 0 };

const navPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "set/navWidth":
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

export default navPageReducer;
