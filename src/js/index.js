import { recipes } from "../data/recipes.js";
import { RecipeCard } from "./constructor/RecipeCard.js";
import { GenerateFilterLists } from "./constructor/GenerateFilterLists.js";
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

// Création des listes déroulantes
let ingredientsMenu = document.createElement("ul");
let appliancesMenu = document.createElement("ul");
let ustensilsMenu = document.createElement("ul");

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

// Appending <ul>
ingredientsList.appendChild(ingredientsMenu);
appliancesList.appendChild(appliancesMenu);
ustensilsList.appendChild(ustensilsMenu);

// Sélectionner les éléments du DOM
ingredientsMenu.querySelector(".tags__dropdown__ingredients__list");
appliancesMenu.querySelector(".tags__dropdown__appliances__list");
ustensilsMenu.querySelector(".tags__dropdown__ustensils__list");

// Evenements clic sur une flèche de menu déroulant
ingredientsArrow.addEventListener("click", manageIngredientsDropdown);
appliancesArrow.addEventListener("click", manageAppliancesDropdown);
ustensilsArrow.addEventListener("click", manageUstensilsDropdown);

// Fonctions poiur ouvrir les menus déroulants
function manageIngredientsDropdown() {
  if (ingredientsArrow.classList.contains("spinning")) {
    ingredientsArrow.classList.remove("spinning");
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

// Renvoie les tableaux filtrés
const filtersLists = new GenerateFilterLists(recipes);
const filteredIngredients = filtersLists.getIngredients();
const filteredAppliances = filtersLists.getAppliances();
const filteredUstensils = filtersLists.getUstensils();

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

// Dropdown menus filter
function dropdownListFilter(target, menu) {
  document.getElementById(target).addEventListener("input", () => {
    let searchValue = document.getElementById(target).value;
    let listItems = menu.querySelectorAll(".filter li");

    listItems.forEach((items, index) => {
      if (!items.innerText.toLowerCase().includes(searchValue)) {
        listItems[index].classList.add("hide");
      } else {
        listItems[index].classList.remove("hide");
      }
    });
  });
}

dropdownListFilter("ingredients", ingredientsMenu);
dropdownListFilter("appliances", appliancesMenu);
dropdownListFilter("ustensils", ustensilsMenu);
