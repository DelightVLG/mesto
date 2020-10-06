export default class Section {
  constructor({
    data,
    renderer,
  }, containerSelector) {
    this._rendererItems = data; // данные которые нужно перебрать и добавить
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector); // селектор куда вставить
  }

  renderItems() {
    this._rendererItems.forEach((items) => this._renderer(items));
  }

  // метод принимает элемент и втсавляет его в указанный контейнер
  addItem(elem) {
    this._containerSelector.prepend(elem);
  }
}
