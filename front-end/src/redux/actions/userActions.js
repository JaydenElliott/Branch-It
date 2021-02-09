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
