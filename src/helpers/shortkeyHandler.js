class ShortkeyHandler {
  constructor() {
    this.events = {}
    document.body.addEventListener('keydown', ({key: _key, metaKey: _metaKey, shiftKey: _shiftKey}) => {
      Object.keys(this.events).forEach(topic => {
        const {metaKey, shiftKey, key} = this.events[topic].condition
        if (metaKey === _metaKey && shiftKey === _shiftKey && key === _key) {
          this.events[topic].callback.call()
        }
      })
    })
  }

  addEvent(name, {metaKey, shiftKey, key}, callback) {
    if (!this.events[name]) {
      this.events[name] = {condition: {metaKey, shiftKey, key}, callback}
    }
  }
}

const shortkeyHandler = new ShortkeyHandler()
export default shortkeyHandler
