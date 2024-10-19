"use strict";

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

// Your functions here

// function 1:
const getUniqueAuthors = (recipes) => {
  const uniqueAuthors = [];
  recipes.forEach((recipe) => {
    if (!uniqueAuthors.includes(recipe.Author))
      uniqueAuthors.push(recipe.Author);
  });

  return uniqueAuthors;
};

// function 2:
const getAllRecipeNames = (recipes) => {
  if (!recipes || recipes.length === 0) {
    console.log("there are no recipes found");
    return [];
  }
  const recipeNames = [];
  recipes.forEach(({ Name }) => {
    recipeNames.push(Name);
  });
  return recipeNames;
};
console.log(getAllRecipeNames(cakeRecipes));

// function 3:
const getRecipeFromAuthor = (recipes, authors) => {
  const filterAuthorRecipe = recipes.filter(
    (recipe) => recipe.Author === authors
  );
  return filterAuthorRecipe;
};

// function 4:
const getIngredientRecipe = (recipes, ingredient) => {
  const newList = [];
  const filterRecipes = recipes.filter((recipe) =>
    recipe.Ingredients.some((ingredients) => ingredients.includes(ingredient))
  );
  for (const recipe of filterRecipes) {
    newList.push(recipe.Name);
  }
  return newList;
};

// function 5:
const getRecipeByName = (recipes, recipeName) => {
  const findAuthorRecipe = recipes.find((recipe) =>
    recipe.Name.includes(recipeName)
  );
  return findAuthorRecipe || null;
};

// function 6:
const getIngredientsFromRecipe = (recipes) => {
  return recipes.reduce((acc, recipe) => acc.concat(recipe.Ingredients), []);
};

// Part 2
const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

const savedRecipes = [];
let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(getUniqueAuthors(cakeRecipes));
      break;
    case 2: {
      const authorName = prompt("Enter authors name: ");
      const authorJamesMartin = getRecipeFromAuthor(cakeRecipes, authorName);
      authorJamesMartin.forEach((author) => {
        console.log(`\n${author.Name}`);
      });
      break;
    }
    case 3: {
      const ingredientName = prompt("Enter an ingredient: ");
      console.log(getIngredientRecipe(cakeRecipes, ingredientName));
      break;
    }
    case 4: {
      const recipeName = prompt("Enter recipe name: ");
      if (getRecipeByName(cakeRecipes, recipeName)) {
        const saveRecipe = prompt("Would you like to save the recipe (Y/N)?: ");
        if (saveRecipe === "y") {
          savedRecipes.push(getRecipeByName(cakeRecipes, recipeName));
        }
      }
      console.dir(savedRecipes, { depth: null });

      break;
    }
    case 5:
      console.log(getIngredientsFromRecipe(savedRecipes));
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
