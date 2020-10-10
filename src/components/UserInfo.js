export default class UserInfo {
  constructor({
    name: nameElement,
    job: jobElement,
    avatar: avatarElement,
  }) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  getUserId() {
    return this._userId;
  }

  // Деструктуризация data (data.profileName, data.profileJob) -> ({ ..., ....})
  setUserInfo({
    name, about, avatar, _id,
  }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatarElement.src = avatar;
    this._avatarElement.alt = `Аватар пользователя ${name}`;
    this._userId = _id;
  }
}
