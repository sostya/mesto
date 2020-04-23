export class UserInfo {
  constructor(name, job, photo, form, api, popup, editWindow) {
    this.name = name
    this.job = job
    this.photo = photo;
    this.form = form;
    this.api = api;
    this.popup = popup;
    this.editWindow = editWindow;
  }
  
  getUserInfo() {
    this.api.getUserData()
    .then((user) => {
      this.name.textContent = user.name;
      this.job.textContent = user.about;
      this.photo.style.backgroundImage = 'url(' + user.avatar + ')';
    })
    .catch((err) => {
      console.log('Ошибка. getUserData');
    })
  }

  sendUserInfo() {
    this.api.sendUserData(this.form.name.value, this.form.job.value)
    .then((data) => {
      /* Можно лучше: в ответ на сохранение данных сервер возвращает обновленные данные пользователя
      не нужно делать ещё один запрос к серверу, нужно использовать данные которые сервер вернул */
      this.getUserInfo()
      this.popup.togglePopup(this.editWindow)
    })
    .catch((err) => {
      console.log('Ошибка. sendUserInfo')
    })
  }

  setUserInfo() {
    this.form.name.value = this.name.textContent;
    this.form.job.value = this.job.textContent;
  }

  // updateUserInfo() {
  //   console.log('333')
  //   this.name.textContent = this.form.name.value;
  //   this.job.textContent = this.form.job.value;
  // }
}