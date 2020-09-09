export default class UserInfo {
  constructor({
    name,
    job,
  }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(name, job) {
    this._name.textContent = name.value;
    this._job.textContent = job.value;
  }
}
