export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._toggleLikeButton = this._toggleLikeButton.bind(this);
  }

  // Метод для получения и клонирования темплейта карточки (разметки)
  _getTemplate() {
    return document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  // Метод для создания образца карточки
  createCard() {
    this._element = this._getTemplate(); // запись разметки в приватное св-во
    this._setEventListeners();

    // Добавление данных
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

  // Метод для навешивания слушателей
  _setEventListeners() {
    const cardImage = this._element.querySelector('.elements__img');
    const cardLikeBtn = this._element.querySelector('.elements__like-btn');
    const cardDeleteBtn = this._element.querySelector('.elements__del-btn');

    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    cardLikeBtn.addEventListener('click', () => {
      this._toggleLikeButton();
    });

    cardDeleteBtn.addEventListener('click', () => {
      this._delete();
    });
  }
}
