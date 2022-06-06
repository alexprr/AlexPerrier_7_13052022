import { recipes } from "../data/recipes.js";
import { RecipeCard } from "./constructor/RecipeCard.js";
import { capitalizeString, normalizer } from "./utils/utils.js";

// Générer les cartes de recettes
const createRecipesCard = (recipes) => {
  const recipeSection = document.getElementById("recipes");

  recipes.forEach((recipe) => {
    recipeSection.innerHTML += "";
    recipeSection.appendChild(new RecipeCard(recipe).buildRecipeCard());
  });
};

createRecipesCard(recipes);

// Générer les listes de filtres

// DOM Elements
const ingredientsList = document.querySelector(".tags__dropdown__ingredients");
const appliancesList = document.querySelector(".tags__dropdown__appliances");
const ustensilsList = document.querySelector(".tags__dropdown__ustensils");

// Advanced selectors arrow
const ingredientsArrow = document.querySelector(
  ".tags__dropdown__ingredients__arrow"
);
const appliancesArrow = document.querySelector(
  ".tags__dropdown__appliances__arrow"
);
const ustensilsArrow = document.querySelector(
  ".tags__dropdown__ustensils__arrow"
);

// Create html <ul>
let ingredientsMenu = document.createElement("ul");
let appliancesMenu = document.createElement("ul");
let ustensilsMenu = document.createElement("ul");

ingredientsMenu.classList.add("tags__dropdown__ingredients__list", "hide");
appliancesMenu.classList.add("tags__dropdown__appliances__list", "hide");
ustensilsMenu.classList.add("tags__dropdown__ustensils__list", "hide");

// Appending <ul>
ingredientsList.appendChild(ingredientsMenu);
appliancesList.appendChild(appliancesMenu);
ustensilsList.appendChild(ustensilsMenu);

// Select DOM Elements
ingredientsMenu.querySelector(".tags__dropdown__ingredients__list");
appliancesMenu.querySelector(".tags__dropdown__appliances__list");
ustensilsMenu.querySelector(".tags__dropdown__ustensils__list");

// Event Listener on click
ingredientsArrow.addEventListener("click", manageIngredientsDropdown);
appliancesArrow.addEventListener("click", manageAppliancesDropdown);
ustensilsArrow.addEventListener("click", manageUstensilsDropdown);

// Open dropdown selectors (refactor into 1 function)
function manageIngredientsDropdown() {
  if (ingredientsArrow.classList.contains("spinning")) {
    ingredientsArrow.classList.remove("spinning");
    // ingredientsArrow.classList.add("reverse-spin");
    ingredientsMenu.classList.remove("show");
    ingredientsMenu.classList.add("hide");
    ingredientsList.classList.remove("resizing");
  } else {
    ingredientsArrow.classList.add("spinning");
    ingredientsMenu.classList.remove("hide");
    ingredientsMenu.classList.add("show");
    ingredientsList.classList.add("resizing");
  }
}

function manageAppliancesDropdown() {
  if (appliancesArrow.classList.contains("spinning")) {
    appliancesArrow.classList.remove("spinning");
    // ingredientsArrow.classList.add("reverse-spin");
    appliancesMenu.classList.remove("show");
    appliancesMenu.classList.add("hide");
    appliancesList.classList.remove("resizing");
  } else {
    appliancesArrow.classList.add("spinning");
    appliancesMenu.classList.remove("hide");
    appliancesMenu.classList.add("show");
    appliancesList.classList.add("resizing");
  }
}

function manageUstensilsDropdown() {
  if (ustensilsArrow.classList.contains("spinning")) {
    ustensilsArrow.classList.remove("spinning");
    // ingredientsArrow.classList.add("reverse-spin");
    ustensilsMenu.classList.remove("show");
    ustensilsMenu.classList.add("hide");
    ustensilsList.classList.remove("resizing");
  } else {
    ustensilsArrow.classList.add("spinning");
    ustensilsMenu.classList.remove("hide");
    ustensilsMenu.classList.add("show");
    ustensilsList.classList.add("resizing");
  }
}

// Initialize all Arrays
const allIngredients = [];
const allAppliances = [];
const allUstensils = [];

// Collect all elements
recipes.map((recipe) =>
  recipe.ingredients.map((ing) =>
    allIngredients.push(ing.ingredient.toLowerCase())
  )
);

recipes.forEach((recipe) => allAppliances.push(recipe.appliance.toLowerCase()));

recipes.map((recipe) =>
  recipe.ustensils.map((ustensil) => allUstensils.push(ustensil.toLowerCase()))
);

// Filtered Array with no duplicate (refactor into 1 function)
const filteredIngredients = allIngredients.filter(
  (el, pos) => allIngredients.indexOf(el) == pos
);

const filteredAppliances = allAppliances.filter(
  (el, pos) => allAppliances.indexOf(el) == pos
);

const filteredUstensils = allUstensils.filter(
  (el, pos) => allUstensils.indexOf(el) == pos
);

// Create clickable list items (ingredients) (refactor into 1 function)
let listIngredients = "";
let listAppliances = "";
let listUstensils = "";

filteredIngredients.forEach((ingredients) => {
  let listItemID = normalizer(`${ingredients}`);
  listIngredients += `<li id="ingredient-${listItemID}" class="list-item" data-info="ingredient-${ingredients}" data-category="ingredient" data-name="${ingredients}">${capitalizeString(
    ingredients
  )}</li>`;
});

filteredAppliances.forEach((appliances) => {
  let listItemID = normalizer(`${appliances}`);
  listAppliances += `<li id="appliance-${listItemID}" class="list-item" data-category="appliance" data-name="${appliances}">${capitalizeString(
    appliances
  )}</li>`;
});

filteredUstensils.forEach((ustensils) => {
  let listItemID = normalizer(`${ustensils}`);
  listUstensils += `<li id="ustensil-${listItemID}" class="list-item" data-category="ustensils" data-name="${ustensils}">${capitalizeString(
    ustensils
  )}</li>`;
});

ingredientsMenu.innerHTML = `${listIngredients}`;
appliancesMenu.innerHTML = `${listAppliances}`;
ustensilsMenu.innerHTML = `${listUstensils}`;
