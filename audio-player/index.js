const wrapperImg = document.querySelector(".wrapper-img");
const audio = document.querySelectorAll("audio");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const btnPlay = document.querySelector(".button-play");
const karusel = document.querySelector(".audio-player__image");
const songAuthor = document.querySelector(".song__author");
const songName = document.querySelector(".song__name");
const progressBarDurring = document.querySelector(".progress__bar--during");
const lengthOfSong = document.querySelector(".time-length");
const progressBar = document.querySelector(".progress__bar");
const currentSongTime = document.querySelector(".current-time");
let isPlay = false;
let currentTreck = 0;
let position = 0;
const movePosition = 25;
function playAudio() {
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
    wrapperImg.style.backgroundImage = `url(/nesmeian-JSFEPRESCHOOL2023Q2/audio-player/img/king_and_joker.jpg)`;
    songAuthor.innerHTML = "King and Joker";
    songName.innerHTML = "Man was eating meat";
    karusel.style.transform = `translate(0%)`;
  } else if (currentTreck == 1) {
    wrapperImg.style.backgroundImage = `url(/nesmeian-JSFEPRESCHOOL2023Q2/audio-player/img/bulletProof.jpg)`;
    songAuthor.innerHTML = "GoodMask";
    songName.innerHTML = "BULLETPROOF";
    karusel.style.transform = `translate(-25%)`;
  } else if (currentTreck == 2) {
    wrapperImg.style.backgroundImage = `url("/nesmeian-JSFEPRESCHOOL2023Q2/audio-player/img/Time_it's_differnt.jpg")`;
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
  if (audio[currentTreck].paused) {
    playAudio();
  } else {
    stopAudio();
  }
}

btnPlay.addEventListener("click", toggleBtn);
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

console.log(progressBar);
progressBar.addEventListener("click", (e) => {
  const timelineWidth = window.getComputedStyle(progressBar).width;
  const timeToSeek =
    (e.offsetX / parseInt(timelineWidth)) * audio[currentTreck].duration;
  audio[currentTreck].currentTime = timeToSeek;
});

setInterval(() => {
  lengthOfSong.textContent = getTimeCodeFromNum(audio[currentTreck].duration);
  progressBarDurring.style.width =
    (audio[currentTreck].currentTime / audio[currentTreck].duration) * 100 +
    "%";
  currentSongTime.textContent = getTimeCodeFromNum(
    audio[currentTreck].currentTime
  );
});

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
