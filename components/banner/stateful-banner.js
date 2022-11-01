import Component from "../../lib/component.js";
import * as helpers from "../../helper.js";

export default class StatefulBanner extends Component {
  constructor(props) {
    super(props);
    this.artUri = "/logo.svg";
    this.template = "/components/banner/stateful-banner.html";
  }

  connectedCallback() {
    helpers.loadHtml(this.template, this).then((data) => {
      console.log("stateful banner connectedCallback");
      this.render();
    });
  }

  _setContainerSize(width, height) {
    this.svgContainer.style.width = `${width}px`;
    this.svgContainer.style.height = `${height}px`;
  }

  render() {
    this.svgContainer = this.querySelector(".svg-container");
    this.text = this.querySelector(".artwork-text");
    const w = window.innerWidth;
    if (window.innerWidth < 768) {
      this._setContainerSize(w, w);
      this.text.classList.add("card-img-overlay");
    } else {
      this._setContainerSize(500, 500);
      this.text.classList.remove("card-img-overlay");
      helpers.loadHtml(this.artUri, this.svgContainer).then((data) => {
        this.svgElement = this.svgContainer.querySelector("svg");
        this.svgElement.style.opacity = "1";
      });
    }
  }
}

customElements.define("djb-stateful-banner", StatefulBanner);
