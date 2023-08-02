console.log(`1.Вёрстка валидная +10 \n
2.Вёрстка семантическая +16\n
3.Вёрстка соответствует макету +54 \n
4.Общие требования к верстке +20\n
Score:100/100`);

//!Burger-menu
const burger = document.querySelector(".header__burger_meny");
const nav = document.querySelector(".nav__list");
const navActive = document.querySelector(".active");
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav__list").forEach((e) =>
  e.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
  })
);
document.addEventListener("mouseup", (e) => {
  if (e.target !== navActive) {
    burger.classList.remove("active");
    nav.classList.remove("active");
  }
});
