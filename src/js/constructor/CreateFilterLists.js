import { Tag } from "./Tag.js";
import { TagAlgo } from "../index.js";

export class CreateFilterLists {
  constructor(filters, filterDOM, color) {
    this.filters = filters;
    this.filterDOM = filterDOM;
    this.color = color;
    this.createFiltersList(this.filters);
  }

  createFiltersList(filters) {
    new List(this.filterDOM, filters, this.color);
  }
}

export class List {
  constructor(filterDOM, filters, color) {
    this.filterDOM = filterDOM;
    this.filters = filters;
    this.color = color;
    this.displayFiltersList(this.filters);
  }

  manageSearchList(e) {
    if (e.target.value.length > 2) {
      const inputData = e.target.value.toLowerCase();
      const newTabFilters = [];
      this.filters.forEach((element) => {
        const findIt = element.toLowerCase.includes(inputData);
        if (findIt == true) {
          newTabFilters.push(element);
        }
      });
      this.displayFiltersList(newTabFilters);
    } else {
      this.displayFiltersList(this.filters);
    }
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
        new Tag(li.innerText, this.color, this.filterDOM.id);
        TagAlgo();
      });
    });
  }
}
