import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import ModalWithImage from '../components/ModalWithImage.js';
import ModalWithForm from '../components/ModalWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  addPlaceModal,
  addPlaceOpenBtn,
  addPlaceSbmtButton,
  editProfModal,
  editProfOpenBtn,
  editProfSubBtn,
  modalFormJob,
  modalFormName,
  previewModal,
  profileName,
  profileSubtitle,
  profileAvatar,
  validationSettings,
} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'c2262ae2-cc7e-47ac-904f-82f5dcb37778',
    'Content-Type': 'application/json',
  },
});

const validatorProfile = new FormValidator(validationSettings, editProfModal);
const validatorCard = new FormValidator(validationSettings, addPlaceModal);

const startValidation = () => {
  validatorProfile.enableValidation();
  validatorCard.enableValidation();
};

startValidation();

// Создание нового экземпляра класса UserInfo ->
const user = new UserInfo({
  name: profileName,
  job: profileSubtitle,
  avatar: profileAvatar,
});
// -> получение данных с сервера
api
  .getUserInfo()
  .then((data) => {
    user.setUserInfo(data);
  })
  .catch((err) => {
    console.error(err);
  });

// -> создание нового класса модалки ред.профиля и отпарвка данных на сервер
const modalEditProfile = new ModalWithForm(editProfModal, {
  handleFormSubmit: (inputsValues) => {
    modalEditProfile.loading(true);
    api.saveUserInfo(inputsValues)
      .then((res) => {
        // console.log('res:', res);
        user.setUserInfo(res);
        modalEditProfile.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        modalEditProfile.loading(false);
      });
  },
});
modalEditProfile.setEventListeners();
// -------------------------------------------------------------------------

function addCard(name, link) {
  const card = new Card(name, link, '.cards-template', cardClickHandle);
  return card.createCard();
}

// Создание экземпляра класса Section
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(addCard(item.name, item.link));
  },
}, '.elements');

// Отрисовка начальных карточек
cardList.renderItems();

// Создание нового экземпляра класса превью картинки
const openModalImage = new ModalWithImage(previewModal);
openModalImage.setEventListeners();

// Хендлер полноформатного изображения
function cardClickHandle(name, link) {
  openModalImage.open(name, link);
}

// Создание нового экземпляра класса ModalWithForm -> форма доб. карточки
const modalAddCard = new ModalWithForm(addPlaceModal, (data) => {
  cardList.addItem(addCard(data.placeName, data.placeUrl));
  modalAddCard.close();
});

modalAddCard.setEventListeners();

editProfOpenBtn.addEventListener('click', () => {
  modalEditProfile.open();
  const userInfo = user.getUserInfo();
  modalFormName.value = userInfo.name;
  modalFormJob.value = userInfo.job;
  validatorProfile.hideAllErrors();
  validatorProfile.enableButton(editProfSubBtn);
});

addPlaceOpenBtn.addEventListener('click', () => {
  modalAddCard.open();
  validatorCard.hideAllErrors();
  validatorCard.disableButton(addPlaceSbmtButton);
});
