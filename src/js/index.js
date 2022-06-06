import { recipes } from "../data/recipes.js";
import { RecipeCard } from "./constructor/RecipeCard.js";

// Générer les cartes de recettes
const createRecipesCard = (recipes) => {
  const recipeSection = document.getElementById("recipes");

  recipes.forEach((recipe) => {
    recipeSection.innerHTML += "";
    recipeSection.appendChild(new RecipeCard(recipe).buildRecipeCard());
  });
};

createRecipesCard(recipes);
