import { capitalizeString } from "../../utils/utils.js";

export class GenerateFilterLists {
  constructor(recipes) {
    this.recipes = recipes;
  }

  getIngredients() {
    let allIngredients = [];
    let allIngredientsItems = [];

    for (let recipe of this.recipes) {
      allIngredients.push(recipe.ingredients);
    }

    for (let ingredients of allIngredients) {
      for (let items of ingredients) {
        allIngredientsItems.push(capitalizeString(items.ingredient));
      }
    }

    allIngredientsItems = this.removeDuplicate(allIngredientsItems);
    return allIngredientsItems.sort();
  }

  getAppliances() {
    let allAppliances = [];

    for (let recipe of this.recipes) {
      allAppliances.push(capitalizeString(recipe.appliance.toLowerCase()));
    }

    allAppliances = this.removeDuplicate(allAppliances);
    return allAppliances.sort();
  }

  getUstensils() {
    let allUstensils = [];
    let allUstensilsItems = [];

    for (let recipes of this.recipes) {
      allUstensils.push(recipes.ustensils);
    }

    for (let ustensils of allUstensils) {
      for (let items of ustensils) {
        allUstensilsItems.push(capitalizeString(items));
      }
    }

    allUstensilsItems = this.removeDuplicate(allUstensilsItems);
    return allUstensilsItems.sort();
  }

  removeDuplicate(arr) {
    const filteredArr = arr.filter((el, pos) => arr.indexOf(el) == pos);
    return filteredArr;
  }
}
