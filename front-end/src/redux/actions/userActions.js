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
