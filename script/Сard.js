import {
  previewImage, previewModal, previewSubtitle, toggleModal,
// eslint-disable-next-line import/extensions
} from './index.js';

export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  // Метод для получения темплейта карточек
  _getTemplate() {
    return document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  // Метод для создания образца карточки
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.elements__img');
    const cardTitle = this._element.querySelector('.elements__title');

    cardImage.src = this._link;
    cardImage.alt = `Фотография. ${this._name}`;

    cardTitle.textContent = this._name;

    return this._element;
  }

  // Метод для изменения состояния кнопки лайка
  _toggleLikeButton() {
    this._element.querySelector('.elements__like-btn')
      .classList.toggle('elements__like-btn_is-active');
  }

  // Метод для удаления карточки
  _delete() {
    this._element.remove();
  }

  // Метод для показа фото карточки в модальном окне
  _showFullImage() {
    previewImage.src = this._link;
    previewImage.atl = this._name;
    previewSubtitle.textContent = this._name;
    toggleModal(previewModal);
  }

  // Метод для навешивания слушателей
  _setEventListeners() {
    const cardImage = this._element.querySelector('.elements__img');
    const cardLikeBtn = this._element.querySelector('.elements__like-btn');
    const cardDeleteBtn = this._element.querySelector('.elements__del-btn');

    cardImage.addEventListener('click', () => {
      this._showFullImage();
    });

    cardLikeBtn.addEventListener('click', () => {
      this._toggleLikeButton();
    });

    cardDeleteBtn.addEventListener('click', () => {
      this._delete();
    });
  }
}
