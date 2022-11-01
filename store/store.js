import observer from "../lib/observer.js";

export default class Store {
  constructor(params) {
    let self = this;
    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = "resting";
    // A status property to let us know if the Store
    // is in a mutating store
    self.events = new observer();
    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }
    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }
    // Proxy to observe store changes
    self.state = self._createStateProxy(params);
  }

  _createStateProxy(params) {
    let self = this;
    return new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value;
        console.log(`stateChange: ${key}: ${value}`);
        self.events.publish("stateChange", self.state);
        if (self.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }
        self.status = "resting";
        return true;
      },
    });
  }

  // Dispatch actions
  dispatch(actionKey, payload) {
    let self = this;
    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }
    console.groupCollapsed(`ACTION: ${actionKey}`);
    self.status = "action";
    self.actions[actionKey](self, payload);
    console.groupEnd();
    return true;
  }

  // Commit mutations
  commit(mutationKey, payload) {
    let self = this;
    if (typeof self.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }
    self.status = "mutation";
    let newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
    return true;
  }
}
