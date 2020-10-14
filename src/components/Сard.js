export default class Card {
  constructor(
    cardData, cardSelector, {
      handleCardClick, handleDeleteClick, handleLikeClick,
    },
  ) {
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._id = cardData._id;

    this._titleElement = this._element.querySelector('.elements__title');
    this._imageElement = this._element.querySelector('.elements__img');
    this._elementLikeCounter = this._element.querySelector('.elements__like-counter');
    this._likeBtnElement = this._element.querySelector('.elements__like-btn');
    this._delBtnElement = this._element.querySelector('.elements__del-btn');

    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;

    this._isOwner = cardData.isOwner;
    this._isLiked = cardData.isLiked;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  _renderLike() {
    this._element
      .querySelector('.elements__like-btn')
      .classList
      .toggle('elements__like-btn_is-active');
  }

  toggleLike() {
    this._renderLike();

    if (this._isLiked) {
      this._elementLikeCounter.textContent = Number(this._elementLikeCounter.textContent) - 1;
    } else {
      this._elementLikeCounter.textContent = Number(this._elementLikeCounter.textContent) + 1;
    }

    this._isLiked = !this._isLiked;
  }

  _setEventListeners() {
    this._likeBtnElement.addEventListener('click', () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

    this._delBtnElement.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._element);
    });
  }

  createCard() {
    this._setEventListeners();

    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фотография. ${this._name}`;

    this._elementLikeCounter.textContent = this._likes.length;

    if (!this._isOwner) {
      this._delBtnElement
        .classList
        .add('elements__del-btn_is-hidden');
    }

    if (this._isLiked) {
      this._renderLike();
    }

    return this._element;
  }
}
