console.log(`1.Вёрстка валидная +10 \n
2.Вёрстка семантическая +16\n
3.Вёрстка соответствует макету +54 \n
4.Общие требования к верстке +20\n
Score:100/100`);

//!Burger-menu
const burger = document.querySelector(".header__burger_meny");
const nav = document.querySelector(".nav__list");
const navActive = document.querySelector(".active");
const wrapper = document.querySelector(".wrapper");
burger.addEventListener("click", (e) => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav__list").forEach((e) =>
  e.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
  })
);

document.addEventListener("click", (e) => {
  if (!wrapper.contains(e.target)) {
    nav.classList.remove("active");
    console.log(1);
  }
});

// ! фыв фыв

// (function () {
//   const burgerItem = document.querySelector(".burger");
//   const menu = document.querySelector(".header__nav");
//   const menuCloseItem = document.querySelector(".header__nav-close");
//   const menuLinksCloser = document.querySelector(".header-list");
//   const wrapper = document.querySelector(".wrapper");

//   burgerItem.addEventListener("click", () => {
//     menu.classList.add("header__nav_active");
//   });

//   menuCloseItem.addEventListener("click", () => {
//     menu.classList.remove("header__nav_active");
//   });

//   menuLinksCloser.addEventListener("click", () => {
//     menu.classList.remove("header__nav_active");
//   });
