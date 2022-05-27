import { recipes } from "../../data/recipes.js";

// render recipes cards
export const createAllRecipes = () => {
  recipes.forEach((recipe) => {
    // create card
    let card = document.createElement("div");
    card.classList.add("recipes__card");
    card.setAttribute("data-id", recipe.id);
    // head
    let cardHead = document.createElement("div");
    cardHead.classList.add("recipes__card__head");
    // body
    let content = document.createElement("div");
    content.classList.add("recipes__card__content");
    // title
    let titleContainer = document.createElement("div");
    titleContainer.classList.add("recipes__card__content__title");
    let title = document.createElement("h2");
    title.innerText = `${recipe.name}`;
    // cooking time and infos
    let time = document.createElement("div");
    time.classList.add("recipes__card__content__title__time");
    let timeImg = document.createElement("img");
    timeImg.setAttribute("src", "/src/assets/icons/clock.svg");
    let info = document.createElement("p");
    info.classList.add("recipes__card__content__title__time__info");
    info.innerText = `${recipe.time} min`;
    // cooking steps
    let steps = document.createElement("div");
    steps.classList.add("recipes__card__content__steps");
    // ingredients list
    let list = document.createElement("ul");
    list.classList.add("recipes__card__content__steps__list");

    // generate a list of ingredient
    let ingredients = "";
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.quantity) {
        if (ingredient.quantity && ingredient.unit) {
          ingredients += `<li><span>${ingredient.ingredient} : </span>${ingredient.quantity} ${ingredient.unit}</li>`;
        } else {
          ingredients += `<li><span>${ingredient.ingredient} : </span>${ingredient.quantity}</li>`;
        }
      } else {
        ingredients += `<li><span>${ingredient.ingredient}</span></li>`;
      }
    });

    list.innerHTML = `${ingredients}`;

    // recipe description
    let descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("recipes__card__content__steps__desc");
    let descriptionText = document.createElement("p");
    descriptionText.innerText = `${recipe.description}`;

    // appendChild
    card.appendChild(cardHead);
    card.appendChild(content);
    content.appendChild(titleContainer);
    titleContainer.appendChild(title);
    titleContainer.appendChild(time);
    time.appendChild(timeImg);
    time.appendChild(info);
    content.appendChild(steps);
    steps.appendChild(list);
    steps.appendChild(descriptionContainer);
    descriptionContainer.appendChild(descriptionText);

    const recipeSection = document.querySelector("#recipes");
    recipeSection.appendChild(card);
  });
};
