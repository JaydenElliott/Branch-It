const initialState = {
  name: "",
  email: "",
  lists: [],
  selectedList: undefined,
};

const navPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "update/lists":
      state = {
        ...state,
        lists: action.payload,
      };
      break;
    case "select/list":
      state = { ...state, selectedList: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default navPageReducer;
