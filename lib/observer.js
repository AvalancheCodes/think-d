class Observer {
  constructor() {
    this.state = {};
    this.events = {};
  }

  // Subscribe to an event
  subscribe(event, callback) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }
    return self.events[event].push(callback);
  }

  // Notify the subscribers
  publish(event, data = {}) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }
    return self.events[event].map((callback) => callback(data));
  }
}

export default Observer;
