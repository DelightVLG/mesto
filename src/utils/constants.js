// Profile constants
export const editProfModal = document.querySelector('.modal_type_edit-profile');
export const editProfOpenBtn = document.querySelector('.profile__edit-btn');
export const profileName = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__photo');
export const modalFormName = editProfModal.querySelector('.modal__input-txt_type_name');
export const modalFormJob = editProfModal.querySelector('.modal__input-txt_type_job');
export const editProfSubBtn = editProfModal.querySelector('.modal__sbmt-btn');
export const editAvatarModal = document.querySelector('.modal_type_edit-avatar');
export const editAvatarSbmBtn = editAvatarModal.querySelector('.modal__sbmt-btn');
export const editAvatarBtn = document.querySelector('.profile__photo-container');

// Add place constants
export const addPlaceModal = document.querySelector('.modal_type_add-place');
export const addPlaceOpenBtn = document.querySelector('.profile__add-btn');
export const addPlaceSbmtButton = document.querySelector('.modal__sbmt-btn');

// Preview constants
export const previewModal = document.querySelector('.modal_type_preview');

export const modalWithSubmit = document.querySelector('.modal_type_del-submit');

export const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input-txt',
  submitButtonSelector: '.modal__sbmt-btn',
  inactiveButtonClass: 'modal__sbmt-btn_disabled',
  inputErrorClass: 'modal__input-txt_invalid',
  errorClass: '.modal__input-error_is-active',
};
