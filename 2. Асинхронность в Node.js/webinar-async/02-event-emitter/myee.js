class MyEventEmitter {
  constructor() {
    this.events = {}
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this
      .events[type]
      .push(listener);
  }

  emit(type) {
    if (this.events[type]) {
      const arg = []
        .slice
        .call(arguments, 1);

      this
        .events[type]
        .forEach(listener => {
          listener.apply(this, arg);
        });
    }
  }
}

module.exports = MyEventEmitter;