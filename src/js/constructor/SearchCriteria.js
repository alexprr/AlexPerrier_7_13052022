export class SearchCriteria {
  constructor(recipes) {
    this.recipes = recipes;
  }

  search(query) {
    return this.filterRecipes(query);
  }
}

export class NameSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(query) {
    return this.recipes.filter((recipes) =>
      recipes.name.toLowerCase().includes(query)
    );
  }
}

export class IngredientSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(query) {
    return this.recipes.ingredients.some((recipes) => {
      return recipes.ingredient.toLowerCase().includes(query);
    });
  }
}

export class DescriptionSearch extends SearchCriteria {
  constructor(recipes) {
    super(recipes);
  }

  filterRecipes(query) {
    return this.recipes.description.toLowerCase().includes(query);
  }
}
