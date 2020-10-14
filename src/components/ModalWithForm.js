import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor(modalSelector, { handleFormSubmit }) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modalSelector.querySelector('.modal__form');
    this._submitBtn = this._form.querySelector('.modal__sbmt-btn');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.modal__input-txt');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
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

  loading(isLoading) {
    this._submitBtn.value = isLoading ? 'Сохранение...' : 'Сохранить';
  }
}
