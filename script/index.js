import Card from './Сard.js';
import FormValidator from "./FormValidator.js";
import initialCards from './initialCardsArr.js';

const page = document.querySelector('.page');

const cardsContainer = page.querySelector('.elements');
const editProfModal = page.querySelector('.modal_type_edit-profile');
const editProfOpenBtn = page.querySelector('.profile__edit-btn');
const editProfClsBtn = editProfModal.querySelector('.modal__close-btn');
const editProfModalForm = editProfModal.querySelector('.modal__form');
const profileName = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const modalFormName = editProfModal.querySelector('.modal__input-txt_type_name');
const modalFormJob = editProfModal.querySelector('.modal__input-txt_type_job');
const editProfSubBtn = editProfModal.querySelector('.modal__sbmt-btn');

const addPlaceModal = page.querySelector('.modal_type_add-place');
const addPlaceOpenBtn = page.querySelector('.profile__add-btn');
const addPlaceClsBtn = addPlaceModal.querySelector('.modal__close-btn');
const addPlaceModalForm = document.addPlaceForm;
const addPlaceNameInput = addPlaceModal.querySelector('.modal__input-txt_type_place-name');
const addPlaceUrlInput = addPlaceModal.querySelector('.modal__input-txt_type_img-url');
const addPlaceSbmtButton = addPlaceModal.querySelector('.modal__sbmt-btn');

const previewModal = page.querySelector('.modal_type_preview');
const previewImage = previewModal.querySelector('.modal__preview-img');
const previewSubtitle = previewModal.querySelector('.modal__preview-subtitle');
const previewClsBtn = previewModal.querySelector('.modal__close-btn_type_preview');

export { previewModal, previewImage, previewSubtitle };

// Рендеринг начальных карточек при загрузке страницы
initialCards.forEach((cardItem) => {
  const card = new Card(cardItem.name, cardItem.link, '.cards-template');
  const cardElement = card.createCard();

  cardsContainer.append(cardElement);
});

// Универсальная функция открытия/закрытия модальных окон
const toggleModal = (modalType) => {
  const modalIsOpen = modalType.classList.contains('modal_is-open');
  if (!modalIsOpen) {
    page.addEventListener('keydown', escCloseModal);
    page.addEventListener('click', overlayCloseModal);
  } else {
    page.removeEventListener('keydown', escCloseModal);
    page.removeEventListener('click', overlayCloseModal);
  }
  modalType.classList.toggle('modal_is-open');
};

export { toggleModal };

// Закрытие модальных окон на эск и оверлей.
const escCloseModal = (evt) => {
  if (evt.key === 'Escape') {
    toggleModal(page.querySelector('.modal_is-open'));
  }
};

const overlayCloseModal = (evt) => {
  if (evt.target.classList.contains('modal')) {
    toggleModal(page.querySelector('.modal_is-open'));
  }
};

//  Функция открытия модалки ред.профиля
const toggleEditProfModal = () => {
  if (!editProfModal.classList.contains('modal_is-open')) {
    modalFormName.value = profileName.textContent;
    modalFormJob.value = profileSubtitle.textContent;
    editProfSubBtn.classList.remove('modal__sbmt-btn_disabled');
  }
  toggleModal(editProfModal);
};

// Функция обработчика сабмита на форме редактрования профиля
const editProfFormSubmitHandler = (evt) => {
  evt.preventDefault();

  const editedName = modalFormName.value;
  const editedJob = modalFormJob.value;

  profileName.textContent = editedName;
  profileSubtitle.textContent = editedJob;

  toggleModal(editProfModal);
};

// Функция обработчика сабмита на форме добавления карточки
const addPlaceSubmitHandler = (evt) => {
  evt.preventDefault();

  const card = new Card(
    addPlaceNameInput.value,
    addPlaceUrlInput.value,
    '.cards-template',
  );

  const cardElement = card.createCard();

  cardsContainer.prepend(cardElement);

  addPlaceModalForm.reset();
  toggleModal(addPlaceModal);
};

// Настройка валидации полей
const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input-txt',
  submitButtonSelector: '.modal__sbmt-btn',
  inactiveButtonClass: 'modal__sbmt-btn_disabled',
  inputErrorClass: 'modal__input-txt_invalid',
  errorClass: '.modal__input-error_is-active',
};

const validatorProfile = new FormValidator(validationSettings, editProfModal);
const validatorCard = new FormValidator(validationSettings, addPlaceModal);

const startValidation = () => {
  validatorProfile.enableValidation();
  validatorCard.enableValidation();
};

startValidation();

// Лисенеры на форму редактирования профиля
editProfOpenBtn.addEventListener('click', toggleEditProfModal);
editProfClsBtn.addEventListener('click', () => toggleModal(editProfModal));
editProfModalForm.addEventListener('submit', editProfFormSubmitHandler);
// Лисенеры на форму добавления карточки места
addPlaceOpenBtn.addEventListener('click', () => {
  validatorCard.disableButton(addPlaceSbmtButton);
  toggleModal(addPlaceModal);
});
addPlaceClsBtn.addEventListener('click', () => toggleModal(addPlaceModal));
addPlaceModal.addEventListener('submit', addPlaceSubmitHandler);
// Лиснер на закрытие превью картинки карточки
previewClsBtn.addEventListener('click', () => toggleModal(previewModal));
