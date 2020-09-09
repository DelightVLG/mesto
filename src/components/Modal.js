export default class Modal {
  constructor(modalSelector) {
    this._modalSelector = modalSelector;
    this._closeBtn = this._modalSelector.querySelector('.modal__close-btn');
    this._escCloseHandler = this._escCloseHandler.bind(this);
  }

  open() {
    this._modalSelector.classList.add('modal_is-open');
    document.addEventListener('keydown', this._escCloseHandler);
  }

  close() {
    this._modalSelector.classList.remove('modal_is-open');
    document.removeEventListener('keydown', this._escCloseHandler);
  }

  _closeBtnHandler() {
    this.close();
  }

  _escCloseHandler(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _overlayCloseHandler(evt) {
    if (evt.target.classList.contains('modal')) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', this._closeBtnHandler.bind(this));
    this._modalSelector.addEventListener('click', this._overlayCloseHandler.bind(this));
  }

  removeEventListeners() {
    this._modalSelector.removeEventListener('click', this._overlayCloseHandler.bind(this));
  }
}
