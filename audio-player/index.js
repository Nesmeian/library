const audio = document.querySelectorAll("audio");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const btnPlay = document.querySelector(".button-play");
const karusel = document.querySelector(".audio-player__image");
const songAuthor = document.querySelector(".song__author");
const songName = document.querySelector(".song__name");
let isPlay = false;
let currentTreck = 0;
let position = 0;
const movePosition = 25;
function playAudio() {
  audio[currentTreck].currentTime = 0;
  audio[currentTreck].play();
}
function stopAudio() {
  audio[currentTreck].pause();
}

function checkCurent() {
  if (currentTreck >= audio.length) {
    currentTreck = 0;
  } else if (currentTreck < 0) {
    currentTreck = audio.length - 1;
  }
}

function checkPicture() {
  if (currentTreck == 0) {
    songAuthor.innerHTML = "King and Joker";
    songName.innerHTML = "Man was eating meat";
    karusel.style.transform = `translate(0%)`;
  } else if (currentTreck == 1) {
    songAuthor.innerHTML = "GoodMask";
    songName.innerHTML = "BULLETPROOF";
    karusel.style.transform = `translate(-25%)`;
  } else if (currentTreck == 2) {
    songAuthor.innerHTML = "Evans Bluse";
    songName.innerHTML = "This Time it's Different";
    karusel.style.transform = `translate(-50%)`;
  }
}

function toggleBtn() {
  btnPlay.classList.toggle("stop");
  if (btnPlay.classList.contains("stop")) {
    isPlay = true;
  } else {
    isPlay = false;
  }
  if (isPlay == true) {
    playAudio();
  } else {
    stopAudio();
  }
}
btnPrev.addEventListener("click", () => {
  stopAudio();
  currentTreck--;
  checkCurent();
  btnPlay.classList.add("stop");
  checkPicture();
  playAudio();
});
btnNext.addEventListener("click", () => {
  stopAudio();
  currentTreck++;
  checkCurent();
  btnPlay.classList.add("stop");
  checkPicture();
  playAudio();
});
btnPlay.addEventListener("click", toggleBtn);
console.log(audio.length);
