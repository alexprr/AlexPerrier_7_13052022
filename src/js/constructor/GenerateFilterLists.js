import { capitalizeString } from "../utils/utils.js";

export class GenerateFilterLists {
  constructor(recipes) {
    this.recipes = recipes;
  }

  getIngredients() {
    let allIngredients = [];
    this.recipes.map((recipe) =>
      recipe.ingredients.map((ing) =>
        allIngredients.push(capitalizeString(ing.ingredient.toLowerCase()))
      )
    );
    allIngredients = this.removeDuplicate(allIngredients);
    return allIngredients;
  }

  getAppliances() {
    let allAppliances = [];
    this.recipes.forEach((recipe) =>
      allAppliances.push(capitalizeString(recipe.appliance.toLowerCase()))
    );
    allAppliances = this.removeDuplicate(allAppliances);
    return allAppliances;
  }

  getUstensils() {
    let allUstensils = [];
    this.recipes.map((recipe) =>
      recipe.ustensils.map((ustensil) =>
        allUstensils.push(capitalizeString(ustensil.toLowerCase()))
      )
    );
    allUstensils = this.removeDuplicate(allUstensils);
    return allUstensils;
  }

  removeDuplicate(arr) {
    const filteredArr = arr.filter((el, pos) => arr.indexOf(el) == pos);
    return filteredArr;
  }
}
