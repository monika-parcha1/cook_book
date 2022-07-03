import { types } from "./action";
export const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_RECIPE: {
      const data = state.recipeList || [];
      return {
        ...state,
        recipeList: [...data, action.payload],
      };
    }
    default:
      return state;
  }
};
