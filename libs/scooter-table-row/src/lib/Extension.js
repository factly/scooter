export default class Extension {
  options;
  editor;

  constructor(options = {}) {
    this.options = {
      ...this.defaultOptions,
      ...options,
    };
  }

  bindEditor(editor) {
    this.editor = editor;
  }

  get type() {
    return "extension";
  }

  get name() {
    return "";
  }

  get plugins() {
    return [];
  }

  get rulePlugins() {
    return [];
  }

  get defaultOptions() {
    return {};
  }

  keys(_options) {
    return {};
  }

  inputRules(_options) {
    return [];
  }

  commands(_options) {
    return {};
  }
}
