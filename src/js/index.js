import { recipes } from "../data/recipes.js";
import { RecipeCard } from "../js/constructor/Recipes/RecipeCard.js";
import { GenerateFilterLists } from "../js/constructor/Lists/GenerateFilterLists.js";
import { List } from "../js/constructor/Lists/CreateFilterLists.js";
import { SearchAlgo } from "../js/constructor/Algo/SearchAlgo.js";

// Générer les listes de filtres
function createDropdown(dropdown, type, list) {
  let dropdownMenu = document.querySelector(dropdown);
  let menu = document.createElement("ul");
  menu.classList.add("filter", `filter-${type}`, `${list}`, "hide");
  dropdownMenu.appendChild(menu);
}

createDropdown(
  ".tags__dropdown__ingredients",
  "ingredients",
  "tags__dropdown__ingredients__list"
);
createDropdown(
  ".tags__dropdown__appliances",
  "appliances",
  "tags__dropdown__appliances__list"
);
createDropdown(
  ".tags__dropdown__ustensils",
  "ustensils",
  "tags__dropdown__ustensils__list"
);

// DOM Elements

// Container
const ingredientsList = document.querySelector(".tags__dropdown__ingredients");
const appliancesList = document.querySelector(".tags__dropdown__appliances");
const ustensilsList = document.querySelector(".tags__dropdown__ustensils");

// Flèches des menus déroulants
const ingredientsArrow = document.querySelector(
  ".tags__dropdown__ingredients__arrow"
);
const appliancesArrow = document.querySelector(
  ".tags__dropdown__appliances__arrow"
);
const ustensilsArrow = document.querySelector(
  ".tags__dropdown__ustensils__arrow"
);

// Menu
const ingredientsMenu = document.querySelector(
  ".tags__dropdown__ingredients__list"
);
const appliancesMenu = document.querySelector(
  ".tags__dropdown__appliances__list"
);
const ustensilsMenu = document.querySelector(
  ".tags__dropdown__ustensils__list"
);

// Ajout de classes css
ingredientsMenu.classList.add(
  "filter",
  "filter-ingredient",
  "tags__dropdown__ingredients__list",
  "hide"
);
appliancesMenu.classList.add(
  "filter",
  "filter-appliance",
  "tags__dropdown__appliances__list",
  "hide"
);
ustensilsMenu.classList.add(
  "filter",
  "filter-ustensil",
  "tags__dropdown__ustensils__list",
  "hide"
);

// Evenements clic sur une flèche de menu déroulant
function manageDropdown(arrow, menu, list) {
  if (arrow.classList.contains("spinning")) {
    arrow.classList.remove("spinning");
    menu.classList.remove("show");
    menu.classList.add("hide");
    list.classList.remove("resizing");
  } else {
    arrow.classList.add("spinning");
    menu.classList.remove("hide");
    menu.classList.add("show");
    list.classList.add("resizing");
  }
}

ingredientsArrow.addEventListener("click", () => {
  manageDropdown(ingredientsArrow, ingredientsMenu, ingredientsList);
});
appliancesArrow.addEventListener("click", () => {
  manageDropdown(appliancesArrow, appliancesMenu, appliancesList);
});
ustensilsArrow.addEventListener("click", () => {
  manageDropdown(ustensilsArrow, ustensilsMenu, ustensilsList);
});

// Création et ajout d'item dans les listes
export function newFiltersList(recipes) {
  // Renvoie les tableaux filtrés
  const filtersLists = new GenerateFilterLists(recipes);
  const filteredIngredients = filtersLists.getIngredients();
  const filteredAppliances = filtersLists.getAppliances();
  const filteredUstensils = filtersLists.getUstensils();

  const ingredientsDOM = document.querySelector(".tags__dropdown__ingredients");
  const appliancesDOM = document.querySelector(".tags__dropdown__appliances");
  const ustensilsDOM = document.querySelector(".tags__dropdown__ustensils");

  new List(ingredientsDOM, filteredIngredients, "ingredient");
  new List(appliancesDOM, filteredAppliances, "appliance");
  new List(ustensilsDOM, filteredUstensils, "ustensil");
}

newFiltersList(recipes);

// Dropdown menus filter
function dropdownListFilter(target, menu) {
  document.getElementById(target).addEventListener("input", () => {
    let searchValue = document.getElementById(target).value;
    let listItems = Array.from(menu.querySelectorAll(".filter li"));

    for (let items of listItems) {
      if (!items.innerText.toLowerCase().includes(searchValue)) {
        items.classList.add("hide");
      } else {
        items.classList.remove("hide");
      }
    }
  });
}

dropdownListFilter("ingredients", ingredientsMenu);
dropdownListFilter("appliances", appliancesMenu);
dropdownListFilter("ustensils", ustensilsMenu);

// Générer les cartes de recettes
export const createRecipesCard = (recipes) => {
  const recipeSection = document.getElementById("recipes");
  recipeSection.innerHTML = "";

  for (let recipe of recipes) {
    recipeSection.appendChild(new RecipeCard(recipe).buildRecipeCard());
  }
};

createRecipesCard(recipes);

// Main Algo
export const Search = new SearchAlgo(recipes);
Search.onSearch();
