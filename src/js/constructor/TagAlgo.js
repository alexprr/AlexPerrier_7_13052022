import { createRecipesCard } from "../index.js";
import { newFiltersList } from "../index.js";
import { recipes } from "../../data/recipes.js";

import {
  IngredientSearch,
  AppliancesSearch,
  UtensilsSearch,
} from "./SearchCriteria.js";

export class TagAlgo {
  constructor() {
    this.recipes = recipes;
    this.filteredRecipes;
  }

  tagMatch(tag) {
    const type = tag.getAttribute("data-type");
    tag = tag.innerText.toLowerCase();
    switch (type) {
      case "ingredient":
        this.filteredRecipes = this.recipes.filter((recipe) => {
          const ingredientFilter = new IngredientSearch(this.filteredRecipes);
          const match = ingredientFilter.search(recipe, tag);
          if (match) {
            return match;
          }
        });
        break;
      case "appliance":
        this.filteredRecipes = this.recipes.filter((recipe) => {
          const appliancesFilter = new AppliancesSearch(this.filteredRecipes);
          const match = appliancesFilter.search(recipe, tag);
          if (match) {
            return match;
          }
        });
        break;
      case "ustensil":
        this.filteredRecipes = this.recipes.filter((recipe) => {
          const ustensilsFilter = new UtensilsSearch(this.filteredRecipes);
          const match = ustensilsFilter.search(recipe, tag);
          if (match) {
            return match;
          }
        });
        break;
    }
  }

  onSearch() {
    let TagsArray = Array.from(document.querySelectorAll(".searchtag__btn"));
    if (TagsArray.length != 0) {
      TagsArray.forEach((tags) => {
        this.tagMatch(tags);
      });
      createRecipesCard(this.filteredRecipes);
      newFiltersList(this.filteredRecipes);
    } else {
      createRecipesCard(this.recipes);
      newFiltersList(this.recipes);
    }
  }
}
