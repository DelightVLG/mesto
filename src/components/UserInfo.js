export default class UserInfo {
  constructor({
    name: nameElement,
    job: jobElement,
  }) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  // Деструктуризация data (data.profileName, data.profileJob) -> ({ ..., ....})
  setUserInfo({ profileName, profileJob }) {
    this._nameElement.textContent = profileName;
    // console.log(this._name.textContent = data.profileName);
    this._jobElement.textContent = profileJob;
  }
}
