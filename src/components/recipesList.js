import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { Input } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function RecipeList() {
  const classes = useStyles();

  const list = useSelector((state) => {
    return state.recipe.recipeList || [];
  });

  const [recipesToshow, setRecipesToshow] = useState(list);

  const searchMethod = (value) => {
    if (value === "") {
      setRecipesToshow(list);
      return;
    }

    const data = list.filter((recipe) => {
      let toShow = false;
      const allIngredients = recipe.ingredients.map((el) =>
        el.name.trim().toLowerCase()
      );
      const valueIndex = allIngredients.findIndex((el) => {
        return el.includes(value);
      });

      toShow = valueIndex !== -1;

      return toShow;
    });

    setRecipesToshow(data);
  };

  const debounce = (callback, delay) => {
    let timeout;
    return function (value) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        callback(value);
      }, delay);
    };
  };

  const handleChange = debounce(searchMethod, 800);

  return (
    <>
      <Input
        placeholder="search by ingredient"
        onChange={(e) => {
          handleChange(e.target.value.toLowerCase().trim());
        }}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dish name</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Number of Steps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipesToshow.length === 0 && <p>No Data</p>}
            {recipesToshow.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.dishName}
                </TableCell>
                <TableCell align="right">
                  <img src={row.imageUrl} alt="" height={50} width={50} />
                </TableCell>
                <TableCell align="right">
                  {row.ingredients
                    .map((el) => {
                      return el.name;
                    })
                    .join(", ")}
                </TableCell>
                <TableCell align="center">{row.steps.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
