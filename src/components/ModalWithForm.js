import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor(modalSelector, { handleFormSubmit }) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modalSelector.querySelector('.modal__form');
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.modal__input-txt');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  renderLoading(isLoading) {
    this._modalSelector.querySelector('.modal__sbmt-btn').textContent = isLoading;
  }
}
