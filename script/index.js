const openModalBtn = document.querySelector('.profile__edit-btn');
const modal = document.querySelector('.modal');
const closeModalBtn = modal.querySelector('.modal__close-btn');
const modalForm = modal.querySelector('.modal__form');
let profileName = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let modalFormName = modal.querySelector('.modal__input-txt_type_name')
let modalFormJob = modal.querySelector('.modal__input-txt_type_job')

function toggleModal() {
    if (!modal.classList.contains('modal_is-open')) {
        modalFormName.value = profileName.textContent;
        modalFormJob.value = profileSubtitle.textContent;
    }
    modal.classList.toggle('modal_is-open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    let editedName = modalFormName.value;
    let editedJob = modalFormJob.value;

    profileName.textContent = editedName;
    profileSubtitle.textContent = editedJob;

    toggleModal();
}

openModalBtn.addEventListener('click',toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
modalForm.addEventListener('submit', formSubmitHandler);



