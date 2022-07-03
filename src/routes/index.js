import AddRecipe from "../components/addRecipe";
import Recipes from "../components/recipes";

export const paths = {
  RECIPES: "/recipes",
  ADD_RECIPE: "/add_recipe",
};

export const routes = [
  {
    id: "1",
    path: paths.RECIPES,
    component: <Recipes />,
  },

  {
    id: "2",
    path: paths.ADD_RECIPE,
    component: <AddRecipe />,
  },
];
