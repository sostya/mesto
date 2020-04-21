(function () {
  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '8e3c7bc6-56a6-469a-a69b-2267f32a6132',
      'Content-Type': 'application/json'
    }
  });
  
  const userPhoto = document.querySelector('.user-info__photo');
  const userName = document.querySelector('.user-info__name');
  const userAbout = document.querySelector('.user-info__job');
  const editWindow = document.querySelector('#edit-popup');

  const cardContainer = document.querySelector('.places-list');
  const addCardButton = document.querySelector('#cards-button');
  const editForm = document.querySelector('#edit');
  const openCardPopupButton = document.querySelector('.user-info__button');
  const openEditPopupButton = document.querySelector('.user-info__edit-button');
  const popup = new Popup();
  const userInfo = new UserInfo(userName, userAbout, userPhoto, editForm, api, popup, editWindow);
  const addCardFormValidity = new FormValidator(document.forms.new);
  const addEditFormValidity = new FormValidator(document.forms.edit);
  const cardArray = [];
  const cardInst = new Card();
  
  userInfo.getUserInfo()
  const cardList = new CardList(cardContainer, cardArray, cardInst, api);
  
  cardList.getCards();
  cardList.render();
  cardList.setEventListeners(cardInst, popup);

  openCardPopupButton.addEventListener('click', () => {
    popup.togglePopup(document.getElementById('card-popup'));
  });

  openEditPopupButton.addEventListener('click', () => {
    const inputName = document.querySelector('#input-name');
    const inputJob = document.querySelector('#input-job');
    popup.togglePopup(document.getElementById('edit-popup'));
    userInfo.setUserInfo();
    addEditFormValidity.resetFormErrors(inputName.nextElementSibling, inputJob.nextElementSibling);
  });

  document.addEventListener('invalid', (function () {
    return function (e) {
      //prevent the browser from showing default error bubble / hint
      e.preventDefault();
    };
  })(), true);

  document.forms.new.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardObj = {
      name: document.getElementById('cards').querySelector('.popup__input_type_name').value,
      link: document.getElementById('cards').querySelector('.popup__input_type_link-url').value
    };
    document.forms.new.reset()
    cardList.addCard(new Card(cardObj).card);
    addCardButton.classList.add('popup__button_disabled');
    popup.togglePopup(document.getElementById('card-popup'));
  });

  document.forms.edit.addEventListener('submit', (event) => {
    event.preventDefault();
    userInfo.sendUserInfo();
  });
})();

