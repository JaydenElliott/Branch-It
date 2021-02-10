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
      state = { ...state, lists: deleteListReducer(state.lists, action.payload) };
      break;
    case "update/position":
      state = { ...state, lists: updatePositionReducer(state.lists, action.payload) }
      break;
    default:
      break;
  }
  return state;
};

export default navPageReducer;

/** 
 * Mutably deletes a todo list.
 * @param todoListList: list of todo lists.
 * @param id: id of todo list to delete.
 * @returns todoListList with requested node removed.
 */
const deleteListReducer = (todoListList, id) => {
  if (todoListList.length > 0) {
    for (let i = 0; i < todoListList.length; i++) {
      if (todoListList[i].reactFlow.id === id) {
        return todoListList.length > 1
          ? todoListList
              .slice(0, i)
              .concat(todoListList.slice(i + 1, todoListList.length))
          : [];
      } else {
        todoListList[i].children = deleteListReducer(todoListList[i].children, id);
      }
    }
  }
  return todoListList;
};

/**
 * Mutably updates a todo list's position
 * @param todoListList: list of todo lists.
 * @param {id: string, position: {x: number, y: number}} payload: id of list to update
 * @returns a todoListList with the requested node position updated.
 */
const updatePositionReducer = (todoListList, payload) => {
  // Base case
  if (todoListList.length === 0 || !payload || !payload.id || !payload.position) {
    return todoListList;
  }

  // Get details
  const id = payload.id;
  const position = payload.position;

  // Step case
  // Recusively go through each
  for (let i = 0; i < todoListList.length; i++) {
    // Match ids
    if (todoListList[i].reactFlow.id === id) {
      todoListList[i].reactFlow.position = position;
      return todoListList
    } else {
      todoListList[i].children = updatePositionReducer(todoListList[i].children, payload);
    }
  }

  return todoListList;
}
