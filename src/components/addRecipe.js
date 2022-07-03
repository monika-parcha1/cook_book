import { Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes";
import RecipeForm from "./recipeForm";

const AddRecipe = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        className="flex-start mt-3 ml-3"
        onClick={() => {
          navigate(paths.RECIPES);
        }}
      >
        go back
      </Button>
      <div className="mt-3 ">
        <RecipeForm />
      </div>
    </>
  );
};

export default AddRecipe;
