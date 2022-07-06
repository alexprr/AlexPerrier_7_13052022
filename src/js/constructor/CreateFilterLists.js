import { Tag } from "./Tag.js";
import { TagSearch } from "../index.js";

export class CreateFilterLists {
  constructor(filters, filterDOM, type) {
    this.filters = filters;
    this.filterDOM = filterDOM;
    this.type = type;
    this.createFiltersList(this.filters);
  }

  createFiltersList(filters) {
    new List(this.filterDOM, filters, this.type);
  }
}

export class List {
  constructor(filterDOM, filters, type) {
    this.filterDOM = filterDOM;
    this.filters = filters;
    this.type = type;
    this.displayFiltersList(this.filters);
  }

  displayFiltersList(filters) {
    const listContainer = this.filterDOM.querySelector(".filter");
    listContainer.innerHTML = "";
    filters.forEach((element) => {
      const li = document.createElement("li");
      li.innerText = element;
      li.setAttribute("data-value", `${element}`);
      li.style.cursor = "pointer";
      listContainer.appendChild(li);
      li.addEventListener("click", () => {
        new Tag(li.innerText, this.type, this.filterDOM.id);
        TagSearch.onSearch();
      });
    });
  }
}
