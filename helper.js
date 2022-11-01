export const loadHtml = async (route, element) => {
  const response = await fetch(route).then((data) => data.text());
  element.innerHTML = response;
  return response;
};

export const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Get the image from the css of an element
export const getBackgroundImage = (element) => {
  let img = new Image();
  // img.src = element.style.backgroundImage.replace(/url\(|\)$/gi, "");
  const style = window.getComputedStyle(element);
  img.src = style.getPropertyValue("background-image");
  return img;
};

// debounce function
export const getDebounceFunction = (func, time) => {
  debugger;
  let timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, time, event);
  };
};
