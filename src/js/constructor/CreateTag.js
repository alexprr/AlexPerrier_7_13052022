export class CreateTag {
  constructor(filter, color, type) {
    this.filter = filter;
    this.color = color;
    this.type = type;
  }

  createTag() {
    const div = document.createElement("div");
    div.classList.add("searchtag__btn", `searchtag__btn__${this.color}`);
    div.setAttribute("data-type", `${this.type}`);
    div.innerHTML = `
        <p class="searchtag__btn__text">${this.filter}</p>
        <img src="/src/assets/icons/close.svg" class="searchtag__btn__close" />
        `;

    return div;
  }
}
