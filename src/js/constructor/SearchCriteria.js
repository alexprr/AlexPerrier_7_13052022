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
    return element.name.toLowerCase().includes(query);
  }
}

export class IngredientSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(element, query) {
    return element.ingredients.some((element) => {
      return element.ingredient.toLowerCase().includes(query);
    });
  }
}

export class DescriptionSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(element, query) {
    return element.description.toLowerCase().includes(query);
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
    return element.ustensils.some((element) => {
      return element.toLowerCase().includes(query);
    });
  }
}
