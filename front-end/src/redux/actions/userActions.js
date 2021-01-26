export const updateParentLists = (updatedLists) => {
  return {
    type: "update/lists",
    payload: updatedLists,
  };
};
