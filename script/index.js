// eslint-disable-next-line no-undef
const page = document.querySelector('.page');
const openModalBtn = page.querySelector('.profile__edit-btn');
const modal = page.querySelector('.modal');
const closeModalBtn = modal.querySelector('.modal__close-btn');
const modalForm = modal.querySelector('.modal__form');
const profileName = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const modalFormName = modal.querySelector('.modal__input-txt_type_name');
const modalFormJob = modal.querySelector('.modal__input-txt_type_job');

function toggleModal() {
  if (!modal.classList.contains('modal_is-open')) {
    modalFormName.value = profileName.textContent;
    modalFormJob.value = profileSubtitle.textContent;
  }
  modal.classList.toggle('modal_is-open');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  const editedName = modalFormName.value;
  const editedJob = modalFormJob.value;

  profileName.textContent = editedName;
  profileSubtitle.textContent = editedJob;

  toggleModal();
}

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
modalForm.addEventListener('submit', formSubmitHandler);
