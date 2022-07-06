export class CreateTag {
  constructor(filter, type) {
    this.filter = filter;
    this.type = type;
  }

  createTag() {
    const div = document.createElement("div");
    div.classList.add("searchtag__btn", `searchtag__btn__${this.type}`);
    div.setAttribute("data-type", `${this.type}`);
    div.setAttribute("data-value", `${this.filter.toLowerCase()}`);
    div.innerHTML = `
        <p class="searchtag__btn__text">${this.filter}</p>
        <img src="/src/assets/icons/close.svg" class="searchtag__btn__close" />
        `;

    return div;
  }
}
