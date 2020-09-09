import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }

  open(name, link) {
    const cardImage = this._modalSelector.querySelector('.modal__preview-img');
    const cardSubtitle = this._modalSelector.querySelector('.modal__preview-subtitle');

    cardImage.src = link;
    cardImage.alt = name;
    cardSubtitle.textContent = name;
    super.open();
  }
}
