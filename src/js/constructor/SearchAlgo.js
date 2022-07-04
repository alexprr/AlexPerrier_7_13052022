import {
  NameSearch,
  IngredientSearch,
  DescriptionSearch,
} from "./SearchCriteria.js";

import { newFiltersList } from "../index.js";
import { createRecipesCard } from "../index.js";
import { TagSearch } from "../index.js";

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

    if (findInName || findInIngredients || findInDescription) {
      return true;
    }
  }

  onSearch(recipes) {
    let TagsArray = Array.from(document.querySelectorAll(".searchtag__btn"));
    let recipeSection = document.querySelector("#recipes");
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
          createRecipesCard(this.searchedRecipes);
          newFiltersList(this.searchedRecipes);
        } else {
          this.$recipesSection.innerHTML = `<div class="no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...</div>`;
          recipeSection.classList.add("auto");
        }
        this.recipes = this.searchedRecipes;
      } else if (query.length < 3 && TagsArray.length === 0) {
        this.recipes = recipes;
        this.searchedRecipes = this.recipes;
        createRecipesCard(this.recipes);
        newFiltersList(this.recipes);
        recipeSection.classList.remove("auto");
      } else {
        this.searchedRecipes = this.recipes;
        this.recipes = recipes;
        TagSearch.onSearch();
      }
    });
  }
}
