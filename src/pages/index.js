// TODO: Задокументировать код с помощью JSDoc
// TODO: После принятия работы поработать над уменьшением количества кода
// TODO: После критичных исправлений заняться рекомендательными
// TODO: После разбора курсовой работы (если будет), сделать рефакторинг проблемных частей

import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import ModalWithImage from '../components/ModalWithImage.js';
import ModalWithForm from '../components/ModalWithForm.js';
import ModalWithSubmit from '../components/ModalWithSubmit';
import UserInfo from '../components/UserInfo.js';

import {
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
  editAvatarModal,
  editAvatarBtn,
  editAvatarSbmBtn,
  modalWithSubmit,
  validationSettings,
} from '../utils/constants.js';

// ---------------------------------------------------------------------------
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'c2262ae2-cc7e-47ac-904f-82f5dcb37778',
    'Content-Type': 'application/json',
  },
});
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
const validatorProfile = new FormValidator(validationSettings, editProfModal);
const validatorCard = new FormValidator(validationSettings, addPlaceModal);
const validatorAvatar = new FormValidator(validationSettings, editAvatarModal);

const startValidation = () => {
  validatorProfile.enableValidation();
  validatorCard.enableValidation();
  validatorAvatar.enableValidation();
};

startValidation();
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Создание нового экземпляра класса UserInfo ->
const user = new UserInfo({
  name: profileName,
  job: profileSubtitle,
  avatar: profileAvatar,
});

// -> создание нового класса модалки ред.профиля и отправка данных на сервер
const modalEditProfile = new ModalWithForm(editProfModal, {
  handleFormSubmit: (inputsValues) => {
    modalEditProfile.loading(true);
    api
      .saveUserInfo(inputsValues)
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

// -------------------------------------------------------------------------
// Редактирование аватара пользователя
const modalAvatarEdit = new ModalWithForm(editAvatarModal, {
  handleFormSubmit: (inputValue) => {
    modalAvatarEdit.loading(true);
    api
      .changeAvatar(inputValue)
      .then((res) => {
        user.setUserInfo(res);
        modalAvatarEdit.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        modalAvatarEdit.loading(false);
      });
  },
});

modalAvatarEdit.setEventListeners();

editAvatarBtn.addEventListener('click', () => {
  modalAvatarEdit.open();
  validatorAvatar.disableButton(editAvatarSbmBtn);
});
// -------------------------------------------------------------------------

// Создание модалки превью картинки
const openModalImage = new ModalWithImage(previewModal);
openModalImage.setEventListeners();

// Создание модалки удаления карточки
const confirmModal = new ModalWithSubmit(modalWithSubmit);
confirmModal.setEventListeners();

// -------------------------------------------------------------------------

const addCard = (item) => {
  const currentUserId = user.getUserInfo().id;

  // TODO: обратить внимание при разборе кода на реализацию проверки владельца карточки и лайка
  item.isOwner = (item.owner._id === currentUserId);
  item.isLiked = item.likes.some((like) => like._id === currentUserId);

  const card = new Card(item, '.cards-template', {
    handleCardClick: () => {
      openModalImage.open(item.name, item.link);
    },
    handleDeleteClick: () => {
      confirmModal.open();
      confirmModal.setSubmitAction(() => {
        api
          .deleteCard(item._id)
          .then(() => {
            card.delete();
            confirmModal.close();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    handleLikeClick: (cardId, isLiked) => {
      if (isLiked) {
        api
          .dislikeCard(cardId)
          .then(() => {
            card.toggleLike();
          })
          .catch((err) => console.error(err));
      } else {
        api
          .likeCard(cardId)
          .then(() => {
            card.toggleLike();
          })
          .catch((err) => console.error(err));
      }
    },
  });

  return card.createCard();
};

// -------------------------------------------------------------------------

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(addCard(data));
  },
}, '.elements');

// -------------------------------------------------------------------------

// Пролучение карточек и данных пользователя с сервера.
// TODO: При разборе курсовой обратить внимание как реализована эта часть с Promise.all
Promise.all(
  [
    api.getUserInfo(),
    api.getInitialCardList(),
  ],
)
  .then((results) => {
    const getUserInfoResult = results[0];
    const getInitialCardsResult = results[1];

    user.setUserInfo(getUserInfoResult);
    cardList.renderItems(getInitialCardsResult.reverse());
  })
  .catch((err) => console.error(err));

// -------------------------------------------------------------------------

// Создание нового экземпляра класса ModalWithForm -> форма доб. карточки
const modalAddCard = new ModalWithForm(addPlaceModal, {
  handleFormSubmit: (data) => {
    modalAddCard.loading(true);
    api
      .saveCard(data)
      .then((response) => {
        cardList.addItem(addCard(response));
        validatorCard.disableButton(addPlaceSbmtButton);
        modalAddCard.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        modalAddCard.loading(false);
      });
  },
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
