// action
export const types = {
  ADD_RECIPE: "ADD_RECIPE",
};

export const addRecipe = (data) => {
  return {
    type: types.ADD_RECIPE,
    payload: data,
  };
};
