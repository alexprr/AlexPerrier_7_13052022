export { RecipeCard };

class RecipeCard {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;
  }

  buildRecipeCard() {
    const card = document.createElement("div");
    card.classList.add("recipes__card");
    card.innerHTML = `
        <div class="recipes__card__head"></div>
        <div class="recipes__card__content">
            <div class="recipes__card__content__title">
                <h2>${this.name}</h2>
                <div class="recipes__card__content__title__time">
                    <img src="/src/assets/icons/clock.svg" />
                    <p class="recipes__card__content__title__time__info">${
                      this.time
                    } min</p>
                </div>
            </div>
            <div class="recipes__card__content__steps">
                <ul class="recipes__card__content__steps__list">
                ${this.ingredients.map(
                  (element) =>
                    `<li data-name="${element.ingredient.toLowerCase()}"><span>${
                      element.ingredient
                    }</span> : ${"quantity" in element ? element.quantity : ""}
                  ${"unit" in element ? element.unit : ""}`
                )}</li>
                </ul>
                <div class="recipes__card__content__steps__desc">
                    <p>${this.description}</p>
                </div>
                
            </div>
        </div>
        `;

    return card;
  }
}
