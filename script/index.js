// eslint-disable-next-line no-undef
const page = document.querySelector('.page');

const cardsTemplate = page.querySelector('.cards-template').content;
const cardsContainer = page.querySelector('.elements'); // Контейнер всех карточек ul
// TODO: Сделать рефакторинг форм. Тема: Доступ к значениям элементов форм.
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
const addPlaceNameInput = addPlaceModal.querySelector('.modal__input-txt_type_place-name');
const addPlaceUrlInput = addPlaceModal.querySelector('.modal__input-txt_type_img-url');
const addPlaceSbmtButton = addPlaceModal.querySelector('.modal__sbmt-btn');

const previewModal = page.querySelector('.modal_type_preview');
const previewImage = previewModal.querySelector('.modal__preview-img');
const previewSubtitle = previewModal.querySelector('.modal__preview-subtitle');
const previewClsBtn = previewModal.querySelector('.modal__close-btn_type_preview');

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

// Обработчик кнопки лайка
const likeListener = (elem) => {
  elem.querySelector('.elements__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like-btn_is-active');
  });
};

// Обработчик мусорки
const cardDelete = (elem) => {
  elem.querySelector('.elements__del-btn').addEventListener('click', (evt) => {
    evt.target.closest('li').remove();
  });
};

// Обработчик превью картинки карточки
const cardImgPreview = (elem, src, subtitle = '') => {
  elem.querySelector('.elements__img').addEventListener('click', () => {
    previewImage.src = src;
    previewSubtitle.textContent = subtitle;
    toggleModal(previewModal);
  });
};

// Функция, описывающая логику создания внутренности карточки и навешивания лисенеров
const createCard = (link, name) => {
  const cardElement = cardsTemplate.cloneNode(true);
  const elementImg = cardElement.querySelector('.elements__img');

  elementImg.src = link;
  elementImg.alt = `Фотография. ${name}`;

  cardElement.querySelector('.elements__title').textContent = name;

  likeListener(cardElement);
  cardDelete(cardElement);
  cardImgPreview(cardElement, link, name);

  return cardElement;
};

// Функция добавления карточки в контейнер
const addElement = (container, element) => container.append(element);

// Функция рендеринга начальных карточек при загрузке страницы
// eslint-disable-next-line no-undef
initialCards.forEach((elem) => {
  const cardElement = createCard(elem.link, elem.name);
  addElement(cardsContainer, cardElement);
});

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

  const cardElement = createCard(addPlaceUrlInput.value, addPlaceNameInput.value);

  cardsContainer.prepend(cardElement);

  addPlaceUrlInput.value = '';
  addPlaceNameInput.value = '';

  toggleModal(addPlaceModal);
};

// Лисенеры на форму редактирования профиля
// TODO: Сделать рефакторинг навешивания слушателей. Привести к единоразовосу навешиванию
editProfOpenBtn.addEventListener('click', toggleEditProfModal);
editProfClsBtn.addEventListener('click', () => toggleModal(editProfModal));
editProfModalForm.addEventListener('submit', editProfFormSubmitHandler);
// Лисенеры на форму добавления карточки места
// TODO: подумать как сделать покрасивше потом
addPlaceOpenBtn.addEventListener('click', () => {
  disableButton(addPlaceSbmtButton, 'modal__sbmt-btn_disabled');
  toggleModal(addPlaceModal);
});
addPlaceClsBtn.addEventListener('click', () => toggleModal(addPlaceModal));
addPlaceModal.addEventListener('submit', addPlaceSubmitHandler);
// Лиснер на закрытие превью картинки карточки
previewClsBtn.addEventListener('click', () => toggleModal(previewModal));
