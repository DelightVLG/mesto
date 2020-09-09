export default class Section {
  constructor({
    data,
    renderer,
  }, containerSelector) {
    this._rendererItems = data;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._rendererItems.forEach((items) => this._renderer(items));
  }

  addItem(elem) {
    this._containerSelector.prepend(elem);
  }
}
