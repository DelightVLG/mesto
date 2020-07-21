// eslint-disable-next-line no-undef
const page = document.querySelector('.page');
const initialCards = [
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
const cardsTemplate = page.querySelector('.cards-template').content;
const cardsContainer = page.querySelector('.elements'); // Контейнер всех карточек ul

const editProfModal = page.querySelector('.modal_type_edit-profile');
const editProfOpenBtn = page.querySelector('.profile__edit-btn');
const editProfClsBtn = editProfModal.querySelector('.modal__close-btn');
const editProfModalForm = editProfModal.querySelector('.modal__form');
const profileName = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const modalFormName = editProfModal.querySelector('.modal__input-txt_type_name');
const modalFormJob = editProfModal.querySelector('.modal__input-txt_type_job');

const addPlaceModal = page.querySelector('.modal_type_add-place');
const addPlaceOpenBtn = page.querySelector('.profile__add-btn');
const addPlaceClsBtn = addPlaceModal.querySelector('.modal__close-btn');
const addPlaceNameInput = addPlaceModal.querySelector('.modal__input-txt_type_place-name');
const addPlaceUrlInput = addPlaceModal.querySelector('.modal__input-txt_type_img-url');

const previewModal = page.querySelector('.modal_type_preview');
const previewImage = previewModal.querySelector('.modal__preview-img');
const previewSubtitle = previewModal.querySelector('.modal__preview-subtitle');
const previewClsBtn = previewModal.querySelector('.modal__close-btn_type_preview');

// Функция открытия/закрытия модалок
const toggleModal = (modalType) => {
  modalType.classList.toggle('modal_is-open');
};
//  Функция открытия модалки ред.профиля
const toggleEditProfModal = () => {
  if (!editProfModal.classList.contains('modal_is-open')) {
    modalFormName.value = profileName.textContent;
    modalFormJob.value = profileSubtitle.textContent;
  }
  toggleModal(editProfModal);
};

// Обработчик кнопки лайка
function likeListener(elem) {
  elem.querySelector('.elements__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like-btn_is-active');
  });
}

// Обработчик мусорки
function cardDelete(elem) {
  elem.querySelector('.elements__del-btn').addEventListener('click', (evt) => {
    evt.target.closest('li').remove();
  });
}

// Обработчик превью картинки карточки
function cardImgPreview(elem, src, subtitle = '') {
  elem.querySelector('.elements__img').addEventListener('click', () => {
    previewImage.src = src;
    previewSubtitle.textContent = subtitle;
    toggleModal(previewModal);
  });
}

// Функция, описывающая логику создания внутренности карточки и навешивания лисенеров
function createCard(link, name) {
  const cardElement = cardsTemplate.cloneNode(true);
  const elementImg = cardElement.querySelector('.elements__img');

  elementImg.src = link;
  elementImg.alt = `Фотография. ${name}`;

  cardElement.querySelector('.elements__title').textContent = name;

  likeListener(cardElement);
  cardDelete(cardElement);
  cardImgPreview(cardElement, link, name);

  return cardElement;
}

// Функция добавления карточки в контейнер
function addElement(container, element) {
  container.append(element);
}

// Функция рендеринга начальных карточек при загрузке страницы
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
editProfOpenBtn.addEventListener('click', () => toggleEditProfModal());
editProfClsBtn.addEventListener('click', () => toggleModal(editProfModal));
editProfModalForm.addEventListener('submit', editProfFormSubmitHandler);
// Лисенеры на форму добавления карточки места
addPlaceOpenBtn.addEventListener('click', () => toggleModal(addPlaceModal));
addPlaceClsBtn.addEventListener('click', () => toggleModal(addPlaceModal));
addPlaceModal.addEventListener('submit', addPlaceSubmitHandler);
// Лиснер на закрытие превью картинки карточки
previewClsBtn.addEventListener('click', () => toggleModal(previewModal));
