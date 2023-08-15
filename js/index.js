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
burger.addEventListener("click", (e) => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  logo.classList.toggle("logo--active");
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
  }
});
