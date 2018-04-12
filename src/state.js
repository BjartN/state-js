class State {
  constructor(state) {
    let clone = this.observeData(this.clone(state));
    this.state = clone;
    this.handlers = {};
  }

  /**
   * Subscribe to changes in property
   * @param {*} key
   * @param {*} handler
   */
  observe(key, handler) {
    if (!this.handlers[key]) this.handlers[key] = [];

    this.handlers[key].push(handler);
  }

  /**
   * Subscribe to changes of key
   * @param {*} key
   * @private
   */
  notify(key) {
    if (!this.handlers[key] || this.handlers[key].length < 1) return;

    this.handlers[key].forEach(handler => handler());
  }

  /**
   * Make make a property reactive
   * @param  {} key - Key
   * @param  {} state - Object
   * @private
   */
  makeObservable(key, state) {
    let val = state[key];
    let that = this;

    Object.defineProperty(state, key, {
      get() {
        return val;
      },
      set(newVal) {
        val = newVal;
        that.notify(key);
      }
    });
  }

  /**
   * Convert all fields to observable properties
   * @private
   */
  observeData(state) {
    for (let key in state) {
      if (state.hasOwnProperty(key)) {
        this.makeObservable(key, state);
      }
    }
    return state;
  }

  /**
   * Bind property to textContent of DOM node.
   * @private
   */
  syncNode(node, key) {
    node.textContent = this.state[key];
    this.observe(key, () => (node.textContent = this.state[key]));
  }

  /**
   * Bind all DOM nodes with s-text attributes to properties matching the value of the attribute
   */
  bindToDom() {
    document
      .querySelectorAll("[s-text]")
      .forEach(x => this.syncNode(x, x.attributes["s-text"].value));
  }

  /**
   * Deep clone of object
   * @param {any} object
   * @private
   */
  clone(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
