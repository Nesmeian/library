console.log(`
1.на странице есть несколько фото и строка поиска +5\n
2.в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n
3.При загрузке приложения на странице отображаются полученные от API изображения +10\n
4.Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\n
6.при открытии приложения курсор находится в поле ввода +5\n
7.есть placeholder +5\n
8.автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n
9.поисковый запрос можно отправить нажатием клавиши Enter +5\n
10.после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n
11.в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n`);

const searchBtn = document.querySelector(".search__img");
const img = document.querySelectorAll(".imga");
const clientId = "aBS5IwU-Tuy9ImvqqqmIyle_52j3qEbW_3gEgr5IRz4";
const search = document.querySelector(".search__input");
let value = "winter";
function searchValue() {
  value = search.value;
  fetchHandler();
}
document.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    searchValue();
  }
});
searchBtn.addEventListener("click", searchValue);

async function fetchHandler() {
  const url = `https://api.unsplash.com/search/photos?query=${value}&per_page=15&client_id=${clientId}`;
  const response = await fetch(url);
  const data = await response.json();
  img.forEach((e, i) => {
    e.src = data.results[i]?.urls.regular;
  });
}
fetchHandler();
window.onload = function () {
  search.focus();
};
