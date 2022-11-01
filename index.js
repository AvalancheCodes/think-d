import * as helper from "./helper.js";
import PhotoCard from "/components/card/photo-card.js";
import Gallery from "/components/gallery/gallery.js";
import ArtworkBanner from "/archive/artwork-banner/artwork-banner.js";
import StatefulBanner from "/components/banner/stateful-banner.js";
import winSizeStore from "/store/screen-size/screen-size.js";

const svgContainer = document.querySelector(".svg-container");
const svg = helper.loadHtml("gallery/svg/logo.svg", svgContainer);

// App
const app = document.querySelector("#app");
const onWinSizeChanged = () => {
  winSizeStore.dispatch("updateDimensions", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
};
window.onresize = helper.getDebounceFunction(onWinSizeChanged, 125);

const StatefulBannerElement = new StatefulBanner({ store: winSizeStore });
app.appendChild(StatefulBannerElement);
