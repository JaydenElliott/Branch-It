// To update user.lists
export const updateLists = (updatedLists) => {
  return {
    type: "update/lists",
    payload: updatedLists,
  };
};

// To update user.selectedList
export const selectList = (list) => {
  return {
    type: "select/list",
    payload: list,
  };
};
// To update user.graphFlow
export const updateGraphFlow = (graph) => {
  return {
    type: "update/graphFlow",
    payload: graph,
  };
};

// To delete a list
export const deleteList = (id) => {
  return {
    type: "delete/lists",
    payload: id,
  };
};

// To store the graphFlow position of a node on the rendered graph
export const updatePosition = (id, position) => {
  return {
    type: "update/position",
    payload: { id, position },
  };
};

// To delete a graph node
export const deleteGraphNode = (id) => {
  return {
    type: "delete/graphFlow",
    payload: id,
  };
};

// To update user.userInfo
export const updateUserInfo = (user) => {
  return {
    type: "update/user",
    payload: user,
  };
};
