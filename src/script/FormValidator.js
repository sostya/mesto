export class FormValidator {
  constructor(element) {
    this.element = element;
    this.setEventListeners();
  }

  resetFormErrors(nameError, jobError) {
    nameError.style.display = 'none'
    nameError.textContent = '';
    jobError.style.display = 'none'
    jobError.textContent = '';
  }

  checkInputValidity(event) {
    const errorElement = event.target.nextElementSibling;
    const inputs = Array.from(event.target.form.elements);
    const isValid = !inputs.map(elem => elem.checkValidity()).filter(input => !input).length;
    const activateError = () => errorElement.style.display = 'block';
    const resetError = () => {
      errorElement.style.display = 'none';
      errorElement.textContent = '';
    }

    if (event.target.validity.valueMissing) {
      errorElement.textContent = 'Это обязательное поле'
      activateError();
    }

    if (event.target.validity.tooShort) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
      activateError();
    }

    if (event.target.validity.typeMismatch) {
      errorElement.textContent = 'Здесь должна быть ссылка';
      activateError();
    }

    if (event.target.validity.valid) {
      resetError();
    }
    return isValid
  }

  setSubmitButtonState(isValid) {
    const popupWindow = event.target.closest('.popup__form');
    const button = popupWindow.querySelector('.popup__button');
    if (isValid) {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    } else {
      button.classList.add('popup__button_disabled');
    }
  }

  setEventListeners() {
    this.element.addEventListener('input', (event) => {
      this.setSubmitButtonState(this.checkInputValidity(event));
    });
  }
}
