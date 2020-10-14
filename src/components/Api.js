export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialCardList() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponse);
  }

  saveCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.placeName,
        link: cardData.placeUrl,
      }),
    })
      .then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._getResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._getResponse(res));
  }

  saveUserInfo(inputsValues) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputsValues.name,
        about: inputsValues.about,
      }),
    }).then(this._getResponse);
  }

  changeAvatar(inputValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValue.link,
      }),
    }).then(this._getResponse);
  }
}
