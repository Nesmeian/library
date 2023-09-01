console.log(`1.Вёрстка соответствует макету. Ширина экрана 768px +26 \n
2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n
3.На ширине экрана 768рх реализовано адаптивное меню +12 (Рекомендуется сделать появление бургер-меню на ширине 1024px): \n
Score:50/50`);

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
  if (authMeny.classList.contains("authorization__menu--active")) {
    authMeny.classList.remove("authorization__menu--active");
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
  console.log(movePosition);
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

//!Authorization menu
const authMeny = document.querySelector(".authorization__menu");

logo.addEventListener("click", () => {
  authMeny.classList.toggle("authorization__menu--active");
  if (burger.classList.contains("active")) {
    burger.classList.remove("active");
    nav.classList.remove("active");
  }
});

document.addEventListener("click", (e) => {
  if (!wrapper.contains(e.target)) {
    authMeny.classList.remove("authorization__menu--active");
  }
});

document.querySelectorAll(".authorization__menu").forEach((e) => {
  e.addEventListener("click", () => {
    authMeny.classList.remove("authorization__menu--active");
  });
});

//! POP-UP Registration
const popUpReg = document.querySelector(".pop-up__register");
const authRegstr = document.querySelector(".register");
const closeRegPop = document.querySelector(".pop-up__close_menu");
const popWrappReg = document.querySelector(".pop-up__wrapper_register");
const btnSign = document.querySelector(".library__item_sign");

function popUpInitiate() {
  popUpReg.classList.add("pop-up--active");
  popWrappReg.classList.add("pop-up__wrapper--active");
}

function popUpClose() {
  popUpReg.classList.remove("pop-up--active");
  popWrappReg.classList.remove("pop-up__wrapper--active");
}
btnSign.addEventListener("click", popUpInitiate);
closeRegPop.addEventListener("click", popUpClose);
authRegstr.addEventListener("click", popUpInitiate);

//!POP-UP Log-in
const popUpLog = document.querySelector(".pop-up__log-in");
const authLogIn = document.querySelector(".log-in");
const popWrappLog = document.querySelector(".pop-up__wrapper_log-in");
const btnLogIn = document.querySelector(".library__item_log-in");
const closeLogIn = document.querySelector(".pop-up__close_log-in");

console.log(popUpLog);
console.log(authLogIn);
console.log(popWrappLog);
console.log(btnLogIn);

function popUpLogInitiate() {
  popUpLog.classList.add("pop-up--active");
  popWrappLog.classList.add("pop-up__wrapper--active");
}

function popUpLogClose() {
  popUpLog.classList.remove("pop-up--active");
  popWrappLog.classList.remove("pop-up__wrapper--active");
}

btnLogIn.addEventListener("click", popUpLogInitiate);
authLogIn.addEventListener("click", popUpLogInitiate);
closeLogIn.addEventListener("click", popUpLogClose);
