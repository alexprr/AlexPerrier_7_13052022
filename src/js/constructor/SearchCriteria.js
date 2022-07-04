export class SearchCriteria {
  constructor(recipes) {
    this.recipes = recipes;
  }

  search(element, query) {
    return this.filterRecipes(element, query);
  }
}

export class NameSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(element, query) {
    return element.name.toLowerCase().indexOf(query) >= 0;
  }
}

export class IngredientSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(element, query) {
    const ingredients = element.ingredients;
    for (let ingredient of ingredients) {
      return ingredient.ingredient.toLowerCase().indexOf(query) >= 0;
    }
  }
}

export class DescriptionSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(element, query) {
    return element.description.toLowerCase().indexOf(query) >= 0;
  }
}

export class AppliancesSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(element, query) {
    return element.appliance.toLowerCase().includes(query);
  }
}

export class UtensilsSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(element, query) {
    const ustensils = element.ustensils;
    for (let ustensil of ustensils) {
      if (ustensil.toLowerCase().includes(query)) {
        return true;
      }
    }
  }
}
