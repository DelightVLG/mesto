const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input-txt',
  submitButtonSelector: '.modal__sbmt-btn',
  inactiveButtonClass: 'modal__sbmt-btn_disabled',
  inputErrorClass: 'modal__input-txt_invalid',
  errorClass: '.modal__input-error_is-active',
};

// Функция показывающая ошибку при заполнении поля
const showInputError = (formElement, input, inputErrorClass, errorMessage, errorClass) => {
  input.classList.add(inputErrorClass);

  const errorElement = formElement.querySelector(`#${input.name}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция убирающая ошибку при заполнении поля
const hideInputError = (formElement, input, inputErrorClass, errorClass) => {
  input.classList.remove(inputErrorClass);

  const errorElement = formElement.querySelector(`#${input.name}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция проверяющая валидность полей
const checkInputValidity = (formElement, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showInputError(formElement, input, inputErrorClass, input.validationMessage, errorClass);
  } else {
    hideInputError(formElement, input, inputErrorClass, errorClass);
  }
};

// Проверка есть ли не валидный инпут
const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid);

// Добавление активного состояния кнопки
const enableButton = (buttonElement, inactiveClass) => {
  buttonElement.classList.remove(inactiveClass);
  buttonElement.removeAttribute('disabled');
};

// Добавление не активного состояния кнопки
const disableButton = (buttonElement, inactiveClass) => {
  buttonElement.classList.add(inactiveClass);
  buttonElement.setAttribute('disabled', true);
};

// Функция изменения состояния кнопки сабмита
const toggleButtonState = (inputList, buttonElement, buttonInactiveClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, buttonInactiveClass);
  } else {
    enableButton(buttonElement, buttonInactiveClass);
  }
};

// Обработчик событий на поля ввода
const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, object.inputErrorClass, object.errorClass);
      toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
    });
  });
};

// Функция валидации форм
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, object);
  });
};

enableValidation(validationSettings);
