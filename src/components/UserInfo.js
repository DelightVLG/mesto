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

  setUserInfo(data) {
    this._nameElement.textContent = data.profileName;
    // console.log(this._name.textContent = data.profileName);
    this._jobElement.textContent = data.profileJob;
  }
}
