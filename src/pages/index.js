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

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(addCard(item.name, item.link));
  },
}, '.elements');

cardList.renderItems();

const openModalImage = new ModalWithImage(previewModal);
openModalImage.setEventListeners();

function cardClickHandle(name, link) {
  openModalImage.open(name, link);
}

const user = new UserInfo({
  name: profileName,
  job: profileSubtitle,
});

const modalEditProfile = new ModalWithForm(editProfModal, () => {
  user.setUserInfo(modalFormName, modalFormJob);
  modalEditProfile.close();
});

const modalAddCard = new ModalWithForm(addPlaceModal, (data) => {
  console.log('data:', data);
  cardList.addItem(addCard(data.placeName, data.placeUrl));
  console.log('data.name:', data.name);
  console.log('data.link:', data.link);
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
