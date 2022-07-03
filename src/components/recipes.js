import React from "react";
import { Button } from "@material-ui/core";
import RecipeList from "./recipesList";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes";

const Recipes = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-end mt-3 mr-3">
        <Button
          variant="contained"
          size="small"
          color="primary"
          className="flex-end"
          onClick={() => {
            navigate(paths.ADD_RECIPE);
          }}
        >
          Add Recipe
        </Button>
      </div>
      <div></div>
      <h3 className="text-center">Recipes </h3>
      <RecipeList />
    </>
  );
};

export default Recipes;
