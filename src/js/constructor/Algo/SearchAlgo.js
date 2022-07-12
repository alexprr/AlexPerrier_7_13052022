import {
  NameSearch,
  IngredientSearch,
  DescriptionSearch,
  AppliancesSearch,
  UtensilsSearch,
} from "./SearchCriteria.js";

import { newFiltersList } from "../../index.js";
import { createRecipesCard } from "../../index.js";
import { recipes } from "../../../data/recipes.js";

export class SearchAlgo {
  constructor(recipes) {
    this.recipes = recipes;
    this.searchResult = recipes;
    this.filteredRecipes = recipes;

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

    if (findInName || findInDescription) {
      return true;
    } else if (findInIngredients) {
      return true;
    } else {
      return false;
    }
  }

  onSearch() {
    let TagsArray = Array.from(document.querySelectorAll(".searchtag__btn"));
    let recipeSection = document.querySelector("#recipes");

    this.$input.addEventListener("input", (e) => {
      const query = e.target.value;

      if (query.length >= 3) {
        this.searchResult = [];

        for (let recipe of this.filteredRecipes) {
          const match = this.inputMatch(recipe, query);
          if (match) {
            this.searchResult.push(recipe);
          }
        }

        if (this.searchResult.length != 0) {
          createRecipesCard(this.searchResult);
          newFiltersList(this.searchResult);
        } else {
          this.$recipesSection.innerHTML = `<div class="no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...</div>`;
          recipeSection.classList.add("auto");
        }
        this.recipes = this.searchResult;
      } else if (query.length < 3 && TagsArray.length === 0) {
        this.recipes = recipes;
        createRecipesCard(this.recipes);
        newFiltersList(this.recipes);
        recipeSection.classList.remove("auto");
      } else {
        this.recipes = recipes;
        this.onTagSearch();
      }
    });
  }

  onTagSearch() {
    let TagsArray = Array.from(document.querySelectorAll(".searchtag__btn"));
    if (TagsArray.length != 0) {
      TagsArray.forEach((tags) => {
        this.tagMatch(tags);
      });
      createRecipesCard(this.recipes);
      newFiltersList(this.recipes);
      this.recipes = this.searchResult;
    } else {
      this.recipes = this.searchResult;
      createRecipesCard(this.recipes);
      newFiltersList(this.recipes);
      this.onSearch();
    }
  }

  tagMatch(tag) {
    const type = tag.getAttribute("data-type");
    tag = tag.innerText.toLowerCase();
    switch (type) {
      case "ingredient":
        this.recipes = this.recipes.filter((recipe) => {
          const ingredientFilter = new IngredientSearch(this.recipes);
          const match = ingredientFilter.search(recipe, tag);
          if (match) {
            return match;
          }
        });
        break;
      case "appliance":
        this.recipes = this.recipes.filter((recipe) => {
          const appliancesFilter = new AppliancesSearch(this.recipes);
          const match = appliancesFilter.search(recipe, tag);
          if (match) {
            return match;
          }
        });
        break;
      case "ustensil":
        this.recipes = this.recipes.filter((recipe) => {
          const ustensilsFilter = new UtensilsSearch(this.recipes);
          const match = ustensilsFilter.search(recipe, tag);
          if (match) {
            return match;
          }
        });
        break;
    }
  }
}
