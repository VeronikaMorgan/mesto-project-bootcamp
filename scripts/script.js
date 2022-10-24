// данные профиля
const userName = document.querySelector('.profile__name');
const userJob  = document.querySelector('.profile__descr');

// модалка редактирования профиля
const editPopup     = document.querySelector('#editProfile');
const editFormBtn   = document.querySelector('.profile__button_type_edit');
const editForm      = document.querySelector('.profile-popup__form');
const nameInput     = document.querySelector('#profile-form-name');
const jobInput      = document.querySelector('#profile-form-job');

// модалка добавления карточки
const addCardBtn    = document.querySelector('.profile__button_type_add');
const addCardPopup  = document.querySelector('#addCard');
const addCardForm   = document.querySelector('.new-card-popup__form');
const cardNameInput = document.querySelector('#newCardName');
const cardLinkInput = document.querySelector('#newCardLink');

// шаблон карточки
const cardList    = document.querySelector('.cards__wrapper');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement  = cardTemplate.querySelector('.card').cloneNode(true);
const cardDeletebtn = document.querySelectorAll('.card__delete-btn');
const likeBtn       = document.querySelectorAll('.card__like');

// модалка изображения
const imagePopup = document.querySelector('#openImg');
const imageLink = document.querySelector('.img-popup__img');
const imageCaption = document.querySelector('.img-popup__figcaption');

// все кнопки закрытия мадалок
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');

// дефолтные карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// отрисовка дефолтных карточек
initialCards.forEach(item => {
  createCard(item.name, item.link);
})

// обработчик событий для открытия модалки на клик
editFormBtn.addEventListener('click', () => openPopup(editPopup), editFormDefault());
addCardBtn.addEventListener('click', () => openPopup(addCardPopup));

//обработчик событий для закрытия близжайшей модалки на клик
popupCloseBtns.forEach(function(btn) {
  btn.addEventListener('click', () => closePopup(btn.closest('.popup')));
})

//обработчик для внесения инфорции в профиль при отправлении формы
editForm.addEventListener('submit', editProfile);

//обработчик для добавления новой карточки при отправлении формы
addCardForm.addEventListener('submit', addNewCard);

// создание шаблона для карточки
function createCard(name, link) {
  card = cardElement.cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__cover').src = link;
  createCardPopup(card)
  deleteCard(card);
  like(card);
  cardList.prepend(card);
  return card
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// синхронизация информации в профиле и полях ввода формы
function editFormDefault() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function editProfile (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(editPopup);
}


function like(card) {
  card.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  })
}

function addNewCard(evt) {
  evt.preventDefault();
  createCard(cardNameInput.value, cardLinkInput.value);
  closePopup(addCardPopup);
}

function deleteCard(card) {
  card.querySelector('.card__delete-btn').addEventListener('click', () => {
    card.closest('.card').remove();
  })
}

// создание модалки с икартинкой для карточки
// не нравится эта функция
function createCardPopup(card) {
  card.querySelector('.card__cover').addEventListener('click', () => {
  imageCaption.textContent = card.querySelector('.card__title').textContent;
  imageLink.src = card.querySelector('.card__cover').src;
  openPopup(imagePopup);
})
}
