// Profile constants
const cardsContainer = document.querySelector('.elements');
export const editProfModal = document.querySelector('.modal_type_edit-profile');
export const editProfOpenBtn = document.querySelector('.profile__edit-btn');
const editProfClsBtn = editProfModal.querySelector('.modal__close-btn');
const editProfModalForm = editProfModal.querySelector('.modal__form');
export const profileName = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const modalFormName = editProfModal.querySelector('.modal__input-txt_type_name');
export const modalFormJob = editProfModal.querySelector('.modal__input-txt_type_job');
export const editProfSubBtn = editProfModal.querySelector('.modal__sbmt-btn');

// Add place constants
export const addPlaceModal = document.querySelector('.modal_type_add-place');
export const addPlaceOpenBtn = document.querySelector('.profile__add-btn');
const addPlaceClsBtn = addPlaceModal.querySelector('.modal__close-btn');
const addPlaceModalForm = document.addPlaceForm;
const addPlaceNameInput = addPlaceModal.querySelector('.modal__input-txt_type_place-name');
const addPlaceUrlInput = addPlaceModal.querySelector('.modal__input-txt_type_img-url');
export const addPlaceSbmtButton = addPlaceModal.querySelector('.modal__sbmt-btn');

// Preview constants
export const previewModal = document.querySelector('.modal_type_preview');
const previewImage = previewModal.querySelector('.modal__preview-img');
const previewSubtitle = previewModal.querySelector('.modal__preview-subtitle');
const previewClsBtn = previewModal.querySelector('.modal__close-btn_type_preview');

export const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input-txt',
  submitButtonSelector: '.modal__sbmt-btn',
  inactiveButtonClass: 'modal__sbmt-btn_disabled',
  inputErrorClass: 'modal__input-txt_invalid',
  errorClass: '.modal__input-error_is-active',
};

export const initialCards = [
  {
    name: 'Бали',
    link: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib'
      + '=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=978&q=80',
  },
  {
    name: 'Рим',
    link: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib'
      + '=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1586&q=80',
  },
  {
    name: 'Швейцария',
    link: 'https://images.unsplash.com/photo-1492119884860-63772f175a02?ixlib'
      + '=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1981&q=80',
  },
  {
    name: 'Кёльн',
    link: 'https://images.unsplash.com/photo-1541791940715-e571aa1c3d32?ixlib'
      + '=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  },
  {
    name: 'Таллин',
    link: 'https://images.unsplash.com/photo-1526154668476-dfe52ce0bfcc?ixlib'
      + '=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  },
  {
    name: 'Ватикан',
    link: 'https://images.unsplash.com/photo-1573071510010-65996d895333?ixlib'
      + '=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
  },
];