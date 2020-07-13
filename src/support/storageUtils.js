class StorageUtils {
  constructor() {
    this.subscribers = [];
  }

  subscribe({ id, callback }) {
    if (this.subscribers.some((notifier) => notifier.id === id)) {
      throw new Error("Already subscribed an observer with id = " + id);
    }
    this.subscribers.push({ id, callback });
  }

  unsubscribe(id) {
    this.subscribers = this.subscribers.filter(
      (notifier) => notifier.id !== id
    );
  }

  setLocal(key, value) {
    const prevValue = window.localStorage.getItem(key);
    window.localStorage.setItem(key, value);
    this.subscribers.forEach(({ callback }) =>
      callback({ method: "setItem", key, value, prevValue })
    );
  }

  getLocal(key) {
    const value = window.localStorage.getItem(key);
    this.subscribers.forEach(({ callback }) =>
      callback({ method: "getItem", key, value })
    );
    return value;
  }
}

const storageHelper = new StorageUtils();
export default storageHelper;
