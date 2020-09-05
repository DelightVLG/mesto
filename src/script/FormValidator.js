export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  // Метод отображающий ощибку при заполнении полей
  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);

    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;

    errorElement.classList.add(this._errorClass);
  }

  // Метод убирающий ошибку при заполнении поля
  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);

    const errorElement = this._formElement.querySelector(`#${input.name}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Метод проверяющий валидность полей
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // Метод для проверки наличия хотя бы одного не валидного поля
  // eslint-disable-next-line class-methods-use-this
  _hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
  }

  // Метод для активации кнопки
  enableButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled', false);
  }

  // Метод для дезактивации кнопки
  disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  // Метод изменения состояния кнопки сабмита на формах
  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(buttonElement, this._inactiveButtonClass);
    } else {
      this.enableButton(buttonElement, this._inactiveButtonClass);
    }
  }

  // Метод для навешивания слушателей
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._toggleButtonState(inputList);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
