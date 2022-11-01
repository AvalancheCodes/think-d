import Store from "../store/store.js";

export default class Component extends HTMLElement {
  constructor(props = {}) {
    super();
    this.props = props;
    let self = this;

    this.render = this.render || function () {};

    if (props.store instanceof Store) {
      props.store.events.subscribe("stateChange", () => self.render());
    }

    if (props.hasOwnProperty("element")) {
      this.element = props.element;
    }
  }

  connectedCallback() {}
}
