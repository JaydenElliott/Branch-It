const initialState = {
  name: "",
  email: "",
  lists: [],
  selectedList: undefined,
  graphFlow: [],
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
    case "update/graphFlow":
      state = { ...state, graphFlow: action.payload };
      break;
    case "delete/lists":
      state = { ...state, lists: deleteList(state.lists, action.payload) };
      break;
    default:
      break;
  }
  return state;
};

export default navPageReducer;

/*
  @param todoListList: list of todo lists

*/
const deleteList = (todoListList, id) => {
  if (todoListList.length > 0) {
    for (let i = 0; i < todoListList.length; i++) {
      if (todoListList[i].reactFlow.id === id) {
        return todoListList.length > 1
          ? todoListList
              .slice(0, i)
              .concat(todoListList.slice(i + 1, todoListList.length))
          : [];
      } else {
        todoListList[i].children = deleteList(todoListList[i].children, id);
      }
    }
  }
  return todoListList;
};
