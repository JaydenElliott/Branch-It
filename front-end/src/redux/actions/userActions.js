export const updateParentLists = (updatedLists) => {
  return {
    type: "update/lists",
    payload: updatedLists,
  };
};

export const selectedParentList = (list) => {
  return {
    type: "select/list",
    payload: list,
  };
};
