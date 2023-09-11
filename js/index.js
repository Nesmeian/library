console.log(`1.Вёрстка соответствует макету. Ширина экрана 768px +26 \n
2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n
3.На ширине экрана 768рх реализовано адаптивное меню +12 (Рекомендуется сделать появление бургер-меню на ширине 1024px): \n
Score:50/50`);

console.log(`Этап 1: Пользователь не зарегистрирован - (50/50)\n
1. Ограниченная карусель в блоке About +25\n
2. Слайдер в блоке Favorites +23\n
3. Нажатие на кнопку Check the card ни к чему не приведёт.\n
4. Иконка юзера в хедере отображается в виде силуэта.\n
5. В блоке Favorites все кнопки должны иметь имя Buy, а не Own. +2\n

Этап 2: Пользователь на этапе регистрации - (49/49) \n
1. Меню авторизации при нажатии на иконку пользователя +8\n
2. Модальное окно REGISTER +29\n
3. Окончание регистрации +8\n
4. При наличии регистрации, но будучи не авторизованным - изменение блока Digital Library Cards +4\n

Этап 3: Пользователь на этапе входа в учётную запись после регистрации - (29/29)\n
1. Модальное окно LOGIN +27\n
2. Блок Favorites. Если пользователь ещё не вошёл в учётную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN. +2\n

Этап 4: Пользователь после входа в учётную запись - (76/76)\n
1. Меню профиля при нажатии на иконку с инициалами пользователя +16\n
2. Модальное окно MY PROFILE +25\n
3. Блок Favorites +6\n
4. Модальное окно BUY A LIBRARY CARD +27\n
5. Блок Digital Library Cards. При наличии авторизации вместо кнопки Check the Card будут отображаться данные пользователя и бейджи, как на дизайне LibraryCard after login in account. +2`);

//!Burger-menu
const burger = document.querySelector(".header__burger_meny");
const nav = document.querySelector(".nav__list");
const navActive = document.querySelector(".active");
const logo = document.querySelector(".logo");
const wrapper = document.querySelector(".wrapper");
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  logo.classList.toggle("logo--active");
  if (authNoMeny.classList.contains("authorization__menu--active")) {
    authNoMeny.classList.remove("authorization__menu--active");
  }
  if (authWithMeny.classList.contains("authorization__menu--active")) {
    authWithMeny.classList.remove("authorization__menu--active");
  }
});

document.querySelectorAll(".nav__list").forEach((e) =>
  e.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
    logo.classList.remove("logo--active");
  })
);

document.addEventListener("click", (e) => {
  if (!wrapper.contains(e.target)) {
    nav.classList.remove("active");
    burger.classList.remove("active");
    logo.classList.remove("logo--active");
  }
});

//! Karusel

let position = 0;
let sliderCount = 1;
const karuselContainer = document.querySelector(".about_loyalt__container");
const karuselTrack = document.querySelector(".karusel");
const karuselItem = document.querySelectorAll(".about__img");
const arroyLeft = document.querySelector(".about__arroy_left");
const arroyRight = document.querySelector(".about__arroy_right");
const paginationItem = document.querySelectorAll(".pagination__button");
let movePosition;

// CheckScreen

function CheckScreen() {
  if (window.innerWidth <= 768) {
    movePosition = 560;
  } else if (window.innerWidth >= 1200) {
    movePosition = 480;
    sliderCount = 1;
    position = 0;
    karuselTrack.style.transform = `translate(${position}px)`;
  }
}

// Move

arroyLeft.addEventListener("click", moveLeft);
arroyRight.addEventListener("click", moveRight);
function moveLeft() {
  position += movePosition;
  sliderCount--;
  karuselTrack.style.transform = `translate(${position}px)`;
  CheckScreen();
  CheckFunc();
  CheckPaggination();
}
function moveRight() {
  position -= movePosition;
  sliderCount++;
  karuselTrack.style.transform = `translate(${position}px)`;
  CheckScreen();
  CheckFunc();
  CheckPaggination();
}

// Pagination

for (let i = 0; i < paginationItem.length; i++) {
  CheckScreen();

  paginationItem[i].addEventListener("click", () => {
    sliderCount = i + 1;
    position = -movePosition * i + 1;
    karuselTrack.style.transform = `translate(${position}px)`;
    CheckPaggination();
    CheckFunc();
  });
}

// CheckPaggination
function CheckPaggination() {
  for (let i = 0; paginationItem.length; i++) {
    if (sliderCount == i + 1) {
      paginationItem[i].classList.add("pagination__button--active");
    } else if (sliderCount != i + 1) {
      paginationItem[i].classList.remove("pagination__button--active");
    }
  }
}

// CheckArroyFunc
function CheckFunc() {
  if (sliderCount == 1) {
    arroyLeft.setAttribute("disabled", "");
  } else if (sliderCount > 1) {
    arroyLeft.removeAttribute("disabled", "");
  }
  if (sliderCount == 5) {
    arroyRight.setAttribute("disabled", "");
  } else if (sliderCount <= 4) {
    arroyRight.removeAttribute("disabled", "");
  }
}

// ! Slaider Favorites
const seasonsRadio = document.querySelectorAll(".seasons__label");
const bookItem = document.querySelectorAll(".favorites__book_section");
let favoritesCount = 0;
seasonsRadio.forEach((e, i) => {
  seasonsRadio[i].addEventListener("click", () => {
    bookItem.forEach((elem) => {
      elem.classList.add("inactive");
      setTimeout(function () {
        bookItem[i].classList.remove("inactive");
      }, 700);
    });
  });
});

//!NoAuthorization menu
const authNoMeny = document.querySelector(".no-authorization__menu");

function addNoAuthMeny() {
  authNoMeny.classList.toggle("authorization__menu--active");
  if (burger.classList.contains("active")) {
    burger.classList.remove("active");
    nav.classList.remove("active");
  }
}

document.addEventListener("click", (e) => {
  if (!wrapper.contains(e.target)) {
    authNoMeny.classList.remove("authorization__menu--active");
  }
});

document.querySelectorAll(".no-authorization__menu").forEach((e) => {
  e.addEventListener("click", () => {
    authNoMeny.classList.remove("authorization__menu--active");
  });
});

logo.addEventListener("click", addNoAuthMeny);

//!With AuthMenu
const authWithMeny = document.querySelector(".with-authorization__menu");
const btnlogoOut = document.querySelector(".log-out");
const myProfile = document.querySelector("my-profile");
const passWord = document.querySelector(".card-number");
const myBuyedBooks = document.querySelector(".rented__books_list");
const li = document.createElement("li");

function addWithAuthMeny() {
  authWithMeny.classList.toggle("authorization__menu--active");
  if (burger.classList.contains("active")) {
    burger.classList.remove("active");
    nav.classList.remove("active");
  }
}

document.addEventListener("click", (e) => {
  if (!wrapper.contains(e.target)) {
    authWithMeny.classList.remove("authorization__menu--active");
  }
});

document.querySelectorAll(".with-authorization__menu").forEach((e) => {
  e.addEventListener("click", () => {
    authNoMeny.classList.remove("authorization__menu--active");
  });
});

//! POP-UP Registration
const popUpReg = document.querySelector(".pop-up__register");
const authRegstr = document.querySelector(".register");
const closeRegPop = document.querySelector(".pop-up__close_menu");
const popWrappReg = document.querySelector(".pop-up__wrapper_register");
const btnSign = document.querySelector(".library__item_sign");
const logInLink = document.querySelector(".pop-up-reg__link");
const popUpAct = document.querySelector(".pop-up__wrapper--active");

window.addEventListener("click", (e) => {
  if (
    !logInLink.contains(e.target) &&
    !popUpReg.contains(e.target) &&
    !authRegstr.contains(e.target) &&
    !btnSign.contains(e.target)
  ) {
    popUpReg.classList.remove("pop-up--active");
    popWrappReg.classList.remove("pop-up__wrapper--active");
  }
});

function popUpInitiate() {
  popUpReg.classList.add("pop-up--active");
  popWrappReg.classList.add("pop-up__wrapper--active");
}

function popUpRegClose() {
  popUpReg.classList.remove("pop-up--active");
  popWrappReg.classList.remove("pop-up__wrapper--active");
}

btnSign.addEventListener("click", popUpInitiate);
closeRegPop.addEventListener("click", popUpRegClose);
authRegstr.addEventListener("click", popUpInitiate);

function popUpSwithLogIn() {
  popUpLog.classList.add("pop-up--active");
  popWrappLog.classList.add("pop-up__wrapper--active");
  popUpReg.classList.remove("pop-up--active");
  popWrappReg.classList.remove("pop-up__wrapper--active");
}

logInLink.addEventListener("click", popUpSwithLogIn);

//!POP-UP Log-in
const popUpLog = document.querySelector(".pop-up__log-in");
const authLogIn = document.querySelector(".log-in");
const popWrappLog = document.querySelector(".pop-up__wrapper_log-in");
const btnLogIn = document.querySelector(".library__item_log-in");
const closeLogIn = document.querySelector(".pop-up__close_log-in");
const regInLink = document.querySelector(".pop-up-log__link");

function popUpLogInitiate() {
  popUpLog.classList.add("pop-up--active");
  popWrappLog.classList.add("pop-up__wrapper--active");
}

function popUpLogClose() {
  popUpLog.classList.remove("pop-up--active");
  popWrappLog.classList.remove("pop-up__wrapper--active");
}

function popUpSwithRegIn() {
  popUpLog.classList.remove("pop-up--active");
  popWrappLog.classList.remove("pop-up__wrapper--active");
  popUpReg.classList.add("pop-up--active");
  popWrappReg.classList.add("pop-up__wrapper--active");
}

regInLink.addEventListener("click", popUpSwithRegIn);
btnLogIn.addEventListener("click", popUpLogInitiate);
authLogIn.addEventListener("click", popUpLogInitiate);
closeLogIn.addEventListener("click", popUpLogClose);

// ! Authorization

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("mail-reg");
const password = document.getElementById("password-reg");
const regForm = document.querySelector(".pop-up_reg-in_form");
let usersArr = JSON.parse(window.localStorage.getItem("usersArray"));

// Check usersArray
if (!localStorage.hasOwnProperty("usersArray")) {
  localStorage.setItem("usersArray", JSON.stringify([]));
}

function checkLog(login, str) {
  logo.innerHTML = login;
  logo.classList.add("logo--auth");
  logo.setAttribute("title", str);
}

function nameCapitalization(first, last) {
  return first.slice(0, 1).toUpperCase() + last.slice(0, 1).toUpperCase();
}

function logoStr(first, last) {
  return `${first} ${last}`;
}

function randomNumbers() {
  const min = Math.pow(16, 8);
  const max = Math.pow(16, 9) - 1;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const hexString = randomNumber.toString(16).padStart(9, "0").toUpperCase();
  return hexString;
}

function registerNewUser() {
  let logObj = {
    first: firstName.value,
    last: lastName.value,
    email: email.value,
    password: password.value,
    login: true,
    visits: 1,
    countOfBooks: 0,
    cardNumber: randomNumbers(),
    subscription: false,
    books: [],
    booksTitle: [],
  };
  usersArr.push(logObj);
  passWord.innerHTML = usersArr.cardNumber;
  localStorage.setItem("usersArray", JSON.stringify(usersArr));
}
regForm.addEventListener("submit", registerNewUser);

btnlogoOut.addEventListener("click", () => {
  usersArr.forEach((e) => {
    e.login = false;
    localStorage.setItem("usersArray", JSON.stringify(usersArr));
    location.reload();
  });
});

//! Log In
const logInForm = document.querySelector(".pop-up_log-in_form");
const emailLogIn = document.getElementById("log-mail");
const passLogIn = document.getElementById("log-password");
logInForm.addEventListener("submit", () => {
  usersArr.forEach((e) => {
    if (e.password == passLogIn.value && e.email == emailLogIn.value) {
      e.login = true;
      localStorage.setItem("usersArray", JSON.stringify(usersArr));
      e.visits++;
    }
  });
});

//! My-profile Modal
const myProfileBtn = document.querySelector(".my-profile");
const myProfileModal = document.querySelector(".my-profile__container");
const myProfileCloseBtn = document.querySelector(".my-profile__close_btn");
const visitsCount = document.querySelectorAll(".visits__count");
const booksCount = document.querySelectorAll(".books__count");
const myProfileCard = document.querySelector(".my-profile__card-link");
const myProfileWrapper = document.querySelector(".modal-my-profile");
const myProfileLogo = document.querySelector(".my-profile_logo__img");
const myProfileLogoText = document.querySelector(".my-profile-logo__text");
const copyBtn = document.querySelector(".copy-button");

function addMyprofile() {
  myProfileModal.classList.add("my-profile--active");
  myProfileWrapper.classList.add("modal-my-profile--active");
}

function closeMyprofile() {
  myProfileModal.classList.remove("my-profile--active");
  myProfileWrapper.classList.remove("modal-my-profile--active");
}

myProfileBtn.addEventListener("click", addMyprofile);
myProfileCloseBtn.addEventListener("click", closeMyprofile);

window.addEventListener("click", (e) => {
  if (!myProfileModal.contains(e.target) && !myProfileBtn.contains(e.target)) {
    myProfileModal.classList.remove("my-profile--active");
    myProfileWrapper.classList.remove("modal-my-profile--active");
  }
});

//! checkCondition

//!Buy card Modal
const btnsFavorites = document.querySelectorAll(".favorites__item_button");
const buyCard = document.querySelector(".buy-card");
const buyCardClose = document.querySelector(".buy-card__close-menu");
const buyCardWrap = document.querySelector(".buy-card__wrapper");
const buyCardForm = document.querySelector(".buy-card__form");
const bankId = document.getElementById("bank");
const expir1 = document.getElementById("expirartion-part1");
const expir2 = document.getElementById("expirartion-part2");
const cvc = document.getElementById("cvc");
const cardholder = document.getElementById("cardholder");
const postal = document.getElementById("postal");
const city = document.getElementById("city");
const buyCardBtn = document.querySelector(".buy_book__btn");

function removeBuyCard() {
  buyCard.classList.remove("buy-card--active");
  buyCardWrap.classList.remove("buy-card__wrapper--active");
}

function addBuyCard() {
  buyCard.classList.add("buy-card--active");
  buyCardWrap.classList.add("buy-card__wrapper--active");
}

// ! Outside click closer
window.addEventListener("click", (e) => {
  if (
    !btnsFavorites[0].contains(e.target) &&
    !btnsFavorites[1].contains(e.target) &&
    !btnsFavorites[2].contains(e.target) &&
    !btnsFavorites[3].contains(e.target) &&
    !btnsFavorites[4].contains(e.target) &&
    !btnsFavorites[5].contains(e.target) &&
    !btnsFavorites[6].contains(e.target) &&
    !btnsFavorites[7].contains(e.target) &&
    !btnsFavorites[8].contains(e.target) &&
    !btnsFavorites[9].contains(e.target) &&
    !btnsFavorites[10].contains(e.target) &&
    !btnsFavorites[11].contains(e.target) &&
    !btnsFavorites[12].contains(e.target) &&
    !btnsFavorites[12].contains(e.target) &&
    !btnsFavorites[13].contains(e.target) &&
    !btnsFavorites[14].contains(e.target) &&
    !btnsFavorites[15].contains(e.target) &&
    !popUpLog.contains(e.target) &&
    !btnLogIn.contains(e.target) &&
    !authLogIn.contains(e.target)
  ) {
    popUpLog.classList.remove("pop-up--active");
    popWrappLog.classList.remove("pop-up__wrapper--active");
  }
});

btnsFavorites.forEach((elem) => {
  elem.addEventListener("click", popUpLogInitiate);
});

usersArr.forEach((e) => {
  if (e.login) {
    let logoCap = nameCapitalization(e.first, e.last);
    logoStr(e.first, e.last);
    checkLog(logoCap, logoStr(e.first, e.last));
    passWord.innerHTML = e.cardNumber;
    logo.removeEventListener("click", addNoAuthMeny);
    logo.addEventListener("click", addWithAuthMeny);
    visitsCount[0].innerHTML = e.visits;
    visitsCount[1].innerHTML = e.visits;
    booksCount[0].innerHTML = e.countOfBooks;
    booksCount[1].innerHTML = e.countOfBooks;

    myProfileCard.value = e.cardNumber;
    myProfileLogo.innerHTML = logoCap;
    myProfileLogoText.innerHTML = logoStr(e.first, e.last);

    copyBtn.addEventListener("click", () => {
      myProfileCard.select();
      document.execCommand("copy");
    });

    btnsFavorites.forEach((elem) => {
      elem.removeEventListener("click", popUpLogInitiate);
    });

    btnsFavorites.forEach((elem) => {
      elem.addEventListener("click", addBuyCard);
      if (e.subscription == true) {
        elem.removeEventListener("click", addBuyCard);
      } else {
        elem.addEventListener("click", addBuyCard);
      }
    });
  }
});

buyCardClose.addEventListener("click", removeBuyCard);

// ! Check outside click buy card
usersArr.forEach((e) => {
  if (e.login) {
    window.addEventListener("click", (e) => {
      if (
        !btnsFavorites[0].contains(e.target) &&
        !btnsFavorites[1].contains(e.target) &&
        !btnsFavorites[2].contains(e.target) &&
        !btnsFavorites[3].contains(e.target) &&
        !btnsFavorites[4].contains(e.target) &&
        !btnsFavorites[5].contains(e.target) &&
        !btnsFavorites[6].contains(e.target) &&
        !btnsFavorites[7].contains(e.target) &&
        !btnsFavorites[8].contains(e.target) &&
        !btnsFavorites[9].contains(e.target) &&
        !btnsFavorites[10].contains(e.target) &&
        !btnsFavorites[11].contains(e.target) &&
        !btnsFavorites[12].contains(e.target) &&
        !btnsFavorites[12].contains(e.target) &&
        !btnsFavorites[13].contains(e.target) &&
        !btnsFavorites[14].contains(e.target) &&
        !btnsFavorites[15].contains(e.target) &&
        !buyCard.contains(e.target)
      ) {
        removeBuyCard();
      }
    });
  }
});

//! checking of all input in buy card is full
usersArr.forEach((e) => {
  buyCardForm.addEventListener("submit", () => {
    e.subscription = true;
    localStorage.setItem("usersArray", JSON.stringify(usersArr));
  });
});

//! change favorites buttnos after buying
usersArr.forEach((e) => {
  if (e.subscription) {
    btnsFavorites.forEach((elem) => {
      elem.addEventListener("click", () => {
        let firstTitle =
          elem.previousElementSibling.previousElementSibling.firstElementChild
            .innerHTML;
        let lastTitle =
          elem.previousElementSibling.previousElementSibling.lastElementChild
            .innerHTML;
        e.booksTitle.push(`${firstTitle}`);
        e.books.push(`${firstTitle} ${lastTitle}`);
        e.countOfBooks++;
        elem.disabled = true;
        elem.innerHTML = "Own";
        localStorage.setItem("usersArray", JSON.stringify(usersArr));
      });
    });
  }
});

//! addItemForBooks();
usersArr.forEach((e) => {
  if (e.login) {
    e.books.forEach((el) => {
      const rentedBook = document.createElement("li");
      rentedBook.textContent = el;
      li.classList.add("rented__books_item");
      myBuyedBooks.classList.add("rented__books_list");
      myBuyedBooks.insertBefore(rentedBook, myBuyedBooks.firstChild);
      e.booksTitle.forEach((elem) => {
        btnsFavorites.forEach((button) => {
          const firstTitleValue = button
            .closest(".favorites__item")
            .querySelector(".favorite__item_title-first").textContent;
          if (elem == firstTitleValue) {
            button.disabled = true;
            button.innerHTML = "Own";
          }
        });
      });
    });
  }
});

// ! Change Digital Library Card
const libraryName = document.querySelector(".library__form_input-name");
const libraryCard = document.querySelector(".library__form_input-card");
const DigitalBeidj = document.querySelector(".digital-beidje__personal-data");
const libraryBtn = document.querySelector(".library__form_button");
const libraryTitle = document.querySelector(".library__item_title_2");
const libraryText = document.querySelector(".library__item_text");
const libraryBtnRemove = document.querySelector(".library__item_log-in");
const libraryBtnProfile = document.querySelector(".library__item_sign");
const libraryForm = document.querySelector(".library__container_form");

libraryForm.addEventListener("submit", () => {
  usersArr.forEach((e) => {
    if (
      libraryName.value == `${e.first} ${e.last}` &&
      libraryCard.value == e.cardNumber
    ) {
      DigitalBeidj.classList.add("digital-beidje__personal-data--active");
      libraryBtn.remove();
      libraryBtnRemove.remove();
      setTimeout(function () {
        DigitalBeidj.classList.remove("digital-beidje__personal-data--active");
        libraryBtn.add();
        libraryBtnRemove.add();
      }, 10000);
    }
    ``;
  });
});
console.log(libraryForm);
usersArr.forEach((e) => {
  if (e.login) {
    libraryName.value = `${e.first} ${e.last}`;
    libraryCard.value = e.cardNumber;
    DigitalBeidj.classList.add("digital-beidje__personal-data--active");
    libraryBtn.remove();
    libraryBtnRemove.remove();
    libraryTitle.innerHTML = "Visit your profile";
    libraryText.innerHTML = `With a digital library card you get free access to the Library’s wide array of digital resources including  e-books, databases, educational  resources, and more.`;
    libraryBtnProfile.innerHTML = "Profile";
  }
});
