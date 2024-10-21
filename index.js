"use strict";

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

// Your functions here

/*************************************************************************************************************/
// function 1:
const getUniqueAuthors = (recipes) => {
  const uniqueAuthors = [];
  recipes.forEach((recipe) => {
    if (!uniqueAuthors.includes(recipe.Author))
      uniqueAuthors.push(recipe.Author);
  });
  return uniqueAuthors;
};

/************************************************************************************************************/
// function 2:
const getAllRecipeNames = (recipes) => {
  if (recipes) {
    console.log(recipes.map(({ Name }) => `${Name}`));
    // console.log(getRecipeNames);
  } else {
    console.log("There are no recipes found!");
  }
};

/**************************************************************************************************/
// function 3:
const getRecipesFromAuthor = (recipes, author) => {
  const filterAuthorRecipe = recipes.filter(
    (recipe) => recipe.Author === author
  );
  return filterAuthorRecipe;
};

/********************************************************************************************************/
// function 4:
const getRecipeFromIngredient = (recipes, ingredient) => {
  const filteredRecipeList = [];
  const filterRecipes = recipes.filter((recipe) =>
    recipe.Ingredients.some((ingredients) => ingredients === ingredient)
  );
  filterRecipes.forEach((recipe) => {
    filteredRecipeList.push(recipe.Name);
  });
  // for (const recipe of filterRecipes) {
  //   filteredRecipeList.push(recipe.Name);
  // }
  return filteredRecipeList;
};
console.log(getRecipeFromIngredient(cakeRecipes, "140g caster sugar"));

/*************************************************************************************************/
// function 5:
const getRecipeByName = (recipes, recipeName) => {
  const findAuthorRecipe = recipes.find((recipe) =>
    recipe.Name.includes(recipeName)
  );
  return findAuthorRecipe || null;
};

/**************************************************************************************************/
// function 6:
const getIngredientsFromRecipe = (recipes) => {
  return recipes.reduce((acc, recipe) => [...acc, ...recipe.Ingredients], []);
};

/***************************************************************************************************/
// Part 2
const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("6. Show All Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-6) or 0 to exit: ");
  return parseInt(choice);
};

/***********************************************************************************************/
const capitalizeName = (name) => {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

/**********************************************************************************************/
const savedRecipes = [];
let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log("\nList of all Authors:");
      console.log(getUniqueAuthors(cakeRecipes));
      break;

    case 2: {
      const recipeList = [];
      const authorName = capitalizeName(prompt("Enter authors name: "));
      const authorRecipes = getRecipesFromAuthor(cakeRecipes, authorName);
      authorRecipes.forEach((recipe) => {
        recipeList.push(recipe.Name);
      });
      console.log("\nRecipe List");
      console.log(recipeList);
      break;
    }

    case 3: {
      const ingredientName = prompt("Enter an ingredient: ");
      console.log("\nRecipes based on ingredient");
      console.log(getRecipeFromIngredient(cakeRecipes, ingredientName));
      break;
    }

    case 4: {
      const recipeName = prompt("Enter recipe name: ");
      const getRecipe = getRecipeByName(cakeRecipes, recipeName);
      if (getRecipe) {
        console.log(getRecipe);
        const saveRecipe = prompt(
          "Would you like to save the Ingredients (Y/N)?: "
        ).toLowerCase();
        if (saveRecipe === "y") {
          savedRecipes.push(getRecipeByName(cakeRecipes, recipeName));
        }
      }
      break;
    }

    case 5:
      console.log("\nList of Ingredients");
      console.log(getIngredientsFromRecipe(savedRecipes));
      break;

    case 6:
      getAllRecipeNames(cakeRecipes);
      break;

    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 6.");
  }
} while (choice !== 0);
