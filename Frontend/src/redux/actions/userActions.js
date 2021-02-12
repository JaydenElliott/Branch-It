export const updateLists = (updatedLists) => {
  return {
    type: "update/lists",
    payload: updatedLists,
  };
};

export const selectList = (list) => {
  return {
    type: "select/list",
    payload: list,
  };
};

export const updateGraphFlow = (graph) => {
  return {
    type: "update/graphFlow",
    payload: graph,
  };
};

export const deleteList = (id) => {
  return {
    type: "delete/lists",
    payload: id,
  };
};

export const updatePosition = (id, position) => {
  return {
    type: "update/position",
    payload: {id, position},
  }
}

export const deleteGraphNode = (id) => {
  return {
    type: "delete/graphFlow",
    payload: id,
  };
};

export const updateUserInfo = (user) => {
  return {
    type: "update/user",
    payload: user,
  };
};