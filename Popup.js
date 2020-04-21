class Popup {
  togglePopup(currentPopup, imageStyle) {
    currentPopup.classList.toggle('popup_is-opened');
    currentPopup.addEventListener('click', this.close);
    if (imageStyle !== undefined) {
      const mediaPopupImage = document.querySelector('.popup__media-image');
      mediaPopupImage.setAttribute('src', imageStyle);
    }
  }

  close(event) {
    const popup = event.target.closest('.popup');
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      popup.classList.remove('popup_is-opened');
    }
  }
}