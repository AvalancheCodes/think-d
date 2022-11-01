import Store from "../store.js";

const state = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const actions = {
  updateDimensions: (context, payload) => {
    context.commit("updateDimensions", payload);
  },
};

const mutations = {
  updateDimensions: (state, payload) => {
    state.width = payload.width;
    state.height = payload.height;
  },
};

export default new Store({
  actions,
  mutations,
  state,
});
