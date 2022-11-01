import * as helper from "../../helper.js";

console.log("some text");
class PhotoCard extends HTMLElement {
  constructor(content) {
    super();
    this.template = "/components/card/photo-card.html";
    this.content = content;
  }
  connectedCallback() {
    helper.loadHtml(this.template, this).then((data) => {
      this.innerHTML = data;
      console.log("PhotoCard added to page");
      this._render();
    });
  }
  disconnectedCallback() {
    console.log("PhotoCard removed from page");
  }
  _render() {
    this.querySelector("img").src = this.content.image;
    this.querySelector("h5").textContent = this.content.title;
    this.querySelector("p").textContent = this.content.description;
    // select the data-src attribute and set it to the src attribute
    this.querySelector("img").setAttribute("data-img-src", this.content.image);
  }
}
customElements.define("djb-photo-card", PhotoCard);

export default PhotoCard;
