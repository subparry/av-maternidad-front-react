class StorageUtils {
  constructor() {
    this.notifiers = [];
  }

  subscribe({ id, callback }) {
    if (this.notifiers.some((notifier) => notifier.id === id)) {
      throw new Error("Already subscribed an observer with id = " + id);
    }
    this.notifiers.push({ id, callback });
  }

  unsubscribe(id) {
    this.notifiers = this.notifiers.filter((notifier) => notifier.id !== id);
  }

  setLocal(key, value) {
    const prevValue = window.localStorage.getItem(key);
    window.localStorage.setItem(key, value);
    this.notifiers.forEach(({ callback }) =>
      callback({ method: "setItem", key, value, prevValue })
    );
  }

  getLocal(key) {
    const value = window.localStorage.getItem(key);
    this.notifiers.forEach(({ callback }) =>
      callback({ method: "getItem", key, value })
    );
    return value;
  }
}

const storageHelper = new StorageUtils();
export default storageHelper;
