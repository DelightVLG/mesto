const openModalBtn = document.querySelector('.profile__edit-btn');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close-btm');

const modalForm = modal.querySelector('.modal__form');
const modalFormSbmt = modalForm.querySelector('.modal__sbmt-btn');

let profileName = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


function toggleModal() {
    modal.classList.toggle('modal_is-open');
}

openModalBtn.addEventListener('click',toggleModal);

closeModalBtn.addEventListener('click', toggleModal);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = modalForm.querySelector('.modal__input_txt-type_name');
    let jobInput = modalForm.querySelector('.modal__input-txt_type_job');

    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

modalFormSbmt.addEventListener('click', formSubmitHandler);

