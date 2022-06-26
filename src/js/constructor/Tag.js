import { CreateTag } from "./CreateTag.js";
import { TagAlgo } from "../index.js";

export class Tag {
  constructor(filter, color, type) {
    this.filter = filter;
    this.color = color;
    this.type = type;
    this.addTag();
  }

  addTag() {
    let tag = new CreateTag(this.filter, this.color, this.type);
    tag = tag.createTag();
    const tagSection = document.querySelector(".searchtag");
    tagSection.appendChild(tag);
    tag.addEventListener("click", this.removeTag);
  }

  removeTag(e) {
    let element = e.target;
    element.parentNode.remove(element);
    TagAlgo();
  }
}
