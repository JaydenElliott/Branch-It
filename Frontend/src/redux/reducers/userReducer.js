const initialState = {
  userInfo: undefined,
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
    case "delete/graphFlow":
      state = { ...state, graphFlow: deleteGraphNodeReducer(state.graphFlow, action.payload) } // prettier-ignore
      break;
    case "delete/lists":
      state = { ...state, lists: deleteListReducer(state.lists, action.payload) }; // prettier-ignore
      break;
    case "update/position":
      state = { ...state, lists: updatePositionReducer(state.lists, action.payload) }; // prettier-ignore
      break;
    case "update/user":
      state = { ...state, userInfo: action.payload };
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
        todoListList[i].children = deleteListReducer(
          todoListList[i].children,
          id
        );
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
  if (
    todoListList.length === 0 ||
    !payload ||
    !payload.id ||
    !payload.position
  ) {
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
      return todoListList;
    } else {
      todoListList[i].children = updatePositionReducer(
        todoListList[i].children,
        payload
      );
    }
  }

  return todoListList;
};

/**
 * Immutably deletes react flow references to particular id.
 * @param graphFlow: list of react flows
 * @param id: id of node to delete references to
 */
const deleteGraphNodeReducer = (graphFlow, id) => {
  // Iterate and remove nodes/edges that mention the given id
  for (let i = 0; i < graphFlow.length; i++) {
    if (graphFlow[i].id === id || graphFlow[i].target === id) {
      graphFlow = graphFlow
        .slice(0, i)
        .concat(graphFlow.slice(i + 1, graphFlow.length));
      i--;
    } else if (graphFlow[i].source === id) {
      // You being the node. If you are the source of an edge, then the targets are your children and must be deleted when you are deleted.
      const targetId = graphFlow[i].target;
      graphFlow = graphFlow
        .slice(0, i)
        .concat(graphFlow.slice(i + 1, graphFlow.length));
      graphFlow = deleteGraphNodeReducer(graphFlow, targetId);
      i = 0; // Reset counter as the list length and structure may have been altered greatly by the recursion.
    }
  }

  return graphFlow;
};
