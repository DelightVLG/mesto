import Modal from './Modal.js';

export default class ModalWithSubmit extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }

  setSubmitAction(callback) {
    this._callback = callback;
    this._modalSelector
      .querySelector('.modal__sbmt-btn_type_del-submit')
      .addEventListener('click', this._callback);
  }
}
