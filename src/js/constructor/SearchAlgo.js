import {
  NameSearch,
  IngredientSearch,
  DescriptionSearch,
} from "./SearchCriteria.js";

import { RecipeCard } from "./RecipeCard.js";
import { GenerateFilterLists } from "./GenerateFilterLists.js";
import { List } from "./CreateFilterLists.js";

export class SearchAlgo {
  constructor(recipes) {
    this.recipes = recipes;
    this.searchedRecipes = recipes;

    this.NameSearch = new NameSearch(recipes);
    this.IngredientSearch = new IngredientSearch(recipes);
    this.DescriptionSearch = new DescriptionSearch(recipes);

    this.$input = document.querySelector("#searchbarInput");
    this.$recipesSection = document.getElementById("recipes");
  }

  inputMatch(element, query) {
    const findInName = this.NameSearch.search(element, query);
    const findInIngredients = this.IngredientSearch.search(element, query);
    const findInDescription = this.DescriptionSearch.search(element, query);
    if (findInName || findInIngredients || findInDescription == true) {
      return true;
    } else {
      false;
    }
  }

  clearRecipesSection() {
    this.$recipesSection.innerHTML = "";
  }

  createFiltersList(recipes) {
    const filtersLists = new GenerateFilterLists(recipes);
    const filteredIngredients = filtersLists.getIngredients();
    const filteredAppliances = filtersLists.getAppliances();
    const filteredUstensils = filtersLists.getUstensils();
    const ingredientsDOM = document.querySelector(
      ".tags__dropdown__ingredients"
    );
    const appliancesDOM = document.querySelector(".tags__dropdown__appliances");
    const ustensilsDOM = document.querySelector(".tags__dropdown__ustensils");

    new List(ingredientsDOM, filteredIngredients, "ingredient");
    new List(appliancesDOM, filteredAppliances, "appliance");
    new List(ustensilsDOM, filteredUstensils, "ustensil");
  }

  createRecipesCard(recipes) {
    this.clearRecipesSection();

    for (let recipe of recipes) {
      const recipeCard = new RecipeCard(recipe);
      this.$recipesSection.appendChild(recipeCard.buildRecipeCard());
    }
  }

  onSearch(recipes) {
    recipes = this.searchedRecipes;
    this.$input.addEventListener("input", (e) => {
      const query = e.target.value;

      if (query.length >= 3) {
        let searchResult = [];
        for (let recipe of this.searchedRecipes) {
          const match = this.inputMatch(recipe, query);
          if (match == true) {
            searchResult.push(recipe);
          }
        }
        this.searchedRecipes = searchResult;
        if (this.searchedRecipes.length != 0) {
          this.createRecipesCard(this.searchedRecipes);
          this.createFiltersList(this.searchedRecipes);
        } else {
          this.$recipesSection.innerHTML = `<div class="no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...</div>`;
        }
        this.recipes = this.searchedRecipes;
      } else if (query.length < 3) {
        this.recipes = recipes;
        this.searchedRecipes = this.recipes;
        this.createRecipesCard(this.recipes);
        this.createFiltersList(this.recipes);
      } else {
        this.searchedRecipes = this.recipes;
        this.recipes = recipes;
      }
    });
  }
}
