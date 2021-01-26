export const updateLists = (updatedLists) => {
  return {
    type: "update/lists",
    payload: updatedLists,
  };
};
