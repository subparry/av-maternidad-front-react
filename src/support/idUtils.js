class idUtils {
  constructor() {
    this.counter = 1;
  }

  createUniqueId(string = "generated-id") {
    const uniqueId = `${string}-${this.counter}`;
    this.counter++;
    return uniqueId;
  }
}

const idUtilsInstance = new idUtils();

export default idUtilsInstance;
