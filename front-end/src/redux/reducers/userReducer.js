const initialState = { name: "", email: "", lists: [], selectedList: {} };

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

    case "select/list":
      state = { ...state, selectedList: action.payload };
    default:
      break;
  }
  return state;
};

export default navPageReducer;
