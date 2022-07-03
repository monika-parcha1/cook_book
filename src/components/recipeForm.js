import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../redux/action";
import { paths } from "../routes";

const intialIngredientValues = {
  name: "",
  quantity: "",
  measure_unit: "",
};

const initialFormValues = {
  dishName: "",
  imageUrl: "",
  steps: [],
  ingredients: [intialIngredientValues],
};

const RecipeForm = () => {
  const [values, setVlaues] = useState(initialFormValues);
  const [step, setStep] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    let newValue = values;
    newValue = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setVlaues(newValue);
    if (error) {
      setError("");
    }
  };

  const handleIngredientChange = (event, index) => {
    const ing_list = [...values.ingredients];
    let newValue = ing_list[index];
    newValue = {
      ...newValue,
      [event.target.name]: event.target.value,
    };
    ing_list[index] = newValue;
    setVlaues({
      ...values,
      ingredients: ing_list,
    });
    if (error) {
      setError("");
    }
  };

  const deleteIngredient = (index) => {
    const ing_list = [...values.ingredients];
    ing_list.splice(index, 1);
    setVlaues({
      ...values,
      ingredients: ing_list,
    });
  };

  const addMoreIngredients = () => {
    setVlaues({
      ...values,
      ingredients: [...values.ingredients, intialIngredientValues],
    });
  };

  const addMoreSteps = () => {
    if (step) {
      const newvalue = {
        ...values,
        steps: [...values.steps, step],
      };
      setVlaues(newvalue);
    }
    setStep("");
  };

  const handleValidation = () => {
    if (values.dishName && values.imageUrl && values.steps.length > 0) {
      if (values.ingredients) {
        const data = values.ingredients;
        const check = data.findIndex((el) => {
          return Object.values(el).includes("");
        });
        if (check === -1) {
          return false;
        } else {
          setError("Please fill all details");
          return true;
        }
      }
    } else {
      setError("Please fill all details");
      return true;
    }
  };

  const handleSubmit = () => {
    const isError = handleValidation();
    if (!isError) {
      dispatch(addRecipe(values));
      navigate(paths.RECIPES);
    }
  };

  return (
    <>
      <h3 className="text-center">My Recipe</h3>
      {error && (
        <div className="error">
          <p className="ml-2 mt-2">{error}</p>
        </div>
      )}
      <div className="form_wrapper d-flex ">
        <form className="form">
          <div className="">
            <Input
              name="dishName"
              onChange={handleChange}
              className="form-input m-2"
              placeholder="Please enter dish name"
              value={values.dishName}
            />
          </div>
          <div className="">
            <Input
              name="imageUrl"
              className="form-input m-2 "
              onChange={handleChange}
              placeholder="Please enter dish image url"
              value={values.imageUrl}
            />
          </div>
          <div className="mt-3">
            <span style={{ fontSize: "24px", marginRight: "20px" }}>
              Ingredients :
            </span>{" "}
            {values.ingredients.map((data, index, self) => {
              return (
                <div className="mt-3 ing_div">
                  <Input
                    name="name"
                    value={data.name}
                    className="ing_input"
                    placeholder="name"
                    onChange={(e) => {
                      handleIngredientChange(e, index);
                    }}
                  />

                  <Input
                    name="quantity"
                    className="ing_input"
                    placeholder="quantity"
                    value={data.quantity}
                    onChange={(e) => {
                      handleIngredientChange(e, index);
                    }}
                  />

                  <Input
                    name="measure_unit"
                    className="ing_input"
                    placeholder="measure unit"
                    value={data.measure_unit}
                    onChange={(e) => {
                      handleIngredientChange(e, index);
                    }}
                  />
                  {self.length > 1 && (
                    <div
                      className="delete_icon"
                      onClick={() => {
                        deleteIngredient(index);
                      }}
                    >
                      <span>x</span>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="add_more" onClick={addMoreIngredients}>
              + Add More{" "}
            </div>
          </div>
          <div className="mt-3">
            <h6>Write Steps </h6>
            <Input
              name="step"
              value={step}
              onChange={(e) => {
                setStep(e.target.value);
                if (error) {
                  setError("");
                }
              }}
            />
            <Button
              size="small"
              className="ml-5"
              color="primary"
              variant="outlined"
              onClick={addMoreSteps}
            >
              Add Step
            </Button>
            <ol>
              {values.steps.map((item) => {
                return <li>{item}</li>;
              })}
            </ol>

            <Button
              size="small"
              color="primary"
              variant="contained"
              disabled={error}
              onClick={handleSubmit}
            >
              save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RecipeForm;
