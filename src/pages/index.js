import './index.css';
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
  validationSettings,
} from '../utils/constants.js';

const validatorProfile = new FormValidator(validationSettings, editProfModal);
const validatorCard = new FormValidator(validationSettings, addPlaceModal);

const startValidation = () => {
  validatorProfile.enableValidation();
  validatorCard.enableValidation();
};

startValidation();

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
// Создание нового экземпляра класса UserInfo
const user = new UserInfo({
  name: profileName,
  job: profileSubtitle,
});

// Создание нового экземпляра класса ModalWithForm -> форма ред. профиля
const modalEditProfile = new ModalWithForm(editProfModal, () => {
  user.setUserInfo(modalFormName, modalFormJob);
  modalEditProfile.close();
});

// Создание нового экземпляра класса ModalWithForm -> форма доб. карточки
const modalAddCard = new ModalWithForm(addPlaceModal, (data) => {
  cardList.addItem(addCard(data.placeName, data.placeUrl));
  modalAddCard.close();
});

modalEditProfile.setEventListeners();
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
