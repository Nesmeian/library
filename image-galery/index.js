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
