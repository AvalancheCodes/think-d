import * as helper from "../../helper.js";
import PhotoCard from "../card/photo-card.js";

class Gallery extends HTMLElement {
  constructor() {
    super();
    this.template = "/components/gallery/gallery.html";
  }
  connectedCallback() {
    helper.loadHtml(this.template, this).then((data) => {
      this.innerHTML = data; // Add the template to the page
      console.log("Gallery added to page");
      this._render();
    });
  }
  disconnectedCallback() {
    console.log("Gallery removed from page  ");
  }
  _render() {
    const row = this.querySelector(".row");
    helper.getData("/data/gallery.json").then((data) => {
      data.forEach((item) => {
        const card = new PhotoCard(item);
        row.appendChild(card);
      });
    });
  }
}

customElements.define("djb-gallery", Gallery);

export default Gallery;
