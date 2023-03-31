import Extension from "./Extension";

export default class Node extends Extension {
  get type() {
    return "node";
  }

  get schema() {
    return {};
  }

  inputRules(_options) {
    return [];
  }

  keys(_options) {
    return {};
  }

  commands(_options) {
    return {};
  }
}
