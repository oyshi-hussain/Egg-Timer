document.addEventListener("DOMContentLoaded", function() {
  fetch("partials/header.html")
      .then(response => response.text())
      .then(data => {
          document.body.insertAdjacentHTML("afterbegin", data);
          attachWindowButtons();
      });

  const startButton = document.getElementById("startButton");
  if (startButton) {
      startButton.addEventListener("click", () => {
          window.location.href = "egg-choice.html";
      });
  }

  //Background Music
  const timerPages = ["runnyEggTimer.html", "scrambledTimer.html", "hardBoiledTimer.html", "sunnySideEggTimer.html", "endTimer.html"];

    // ✅ Start music ONLY if not on timer pages
    if (!timerPages.some(page => window.location.pathname.includes(page))) {
        window.electron.startMusic();
    } else {
        window.electron.stopMusic();
    }

  //Hover Sound
  const hoverSound = new Audio("assets/hoverSound.mp3");
  hoverSound.volume = 0.3;  // ✅ Lower volume (0.0 - 1.0)
  hoverSound.playbackRate = 0.8; // ✅ Slow down playback speed (1.0 = normal)

  document.querySelectorAll(".egg-option").forEach(egg => {
      egg.addEventListener("mouseenter", () => {
          hoverSound.currentTime = 0;
          hoverSound.play();
        });
    });

    // ✅ Check if we are on endTimer.html
    if (window.location.pathname.includes("endTimer.html")) {
      const timerSound = new Audio("assets/timerEnd.mp3");
      timerSound.volume = 0.5; // ✅ Adjust volume
      timerSound.play(); // ✅ Play sound when entering endTimer.html
  }

  if (window.location.pathname.includes("runnyEggTimer.html")) {
    document.getElementById("startTimerButton")?.addEventListener("click", startTimerRunny);
  } else if (window.location.pathname.includes("scrambledEggTimer.html")) {
      document.getElementById("startTimerButton")?.addEventListener("click", startTimerScrambled);
  } else if (window.location.pathname.includes("sunnySideEggTimer.html")) {
      document.getElementById("startTimerButton")?.addEventListener("click", startTimerSunny);
  } else if (window.location.pathname.includes("hardBoiledEggTimer.html")) {
      document.getElementById("startTimerButton")?.addEventListener("click", startTimerHardBoiled);
  }

  const startOverButton = document.getElementById("startOverButton");
    if (startOverButton) {
        startOverButton.addEventListener("click", startOver);
    }

});

function attachWindowButtons() {
  const closebtn = document.getElementById("close-btn");
  const minimizebtn = document.getElementById("minimize-btn");

  if (closebtn) {
      closebtn.addEventListener("click", () => {
          window.electron.closeWindow();
      });
  }

  if (minimizebtn) {
      minimizebtn.addEventListener("click", () => {
          window.electron.minimizeWindow();
      });
  }
}

function loadPage(page) {
  window.location.href = page;
}

function goBack() {
  window.location.href = "egg-choice.html";
}

function beginButtonTimer(eggType) {
  window.location.href = `${eggType}Timer.html`;
}

function backback() {
  window.location.href = "runny-egg.html";
}



function startTimer(timeLeft, redirectPage) {
  const timerDisplay = document.getElementById("timerDisplay");
  const startTimerButton = document.getElementById("startTimerButton");

  const tickingSound = new Audio("assets/countdown.mp3"); // ✅ Countdown sound
  tickingSound.volume = 0.3; // ✅ Adjust volume
  tickingSound.loop = true; // ✅ Keep looping during countdown
  // tickingSound.play().catch(() => {});

  if (startTimerButton) {
      startTimerButton.classList.add("hidden");
      setTimeout(() => {
          startTimerButton.style.display = "none";
          startCountdown(timeLeft, redirectPage, tickingSound);
      }, 500);
  } else {
      startCountdown(timeLeft, redirectPage, tickingSound);
  }
}


function startCountdown(timeLeft, redirectPage, tickingSound) {
  const timerDisplay = document.getElementById("timerDisplay");
  tickingSound.play(); // Start ticking sound when countdown begins
  // tickingSound.play().catch(() => {});

  const countdown = setInterval(() => {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      if (timeLeft === 0) {
          clearInterval(countdown);
          tickingSound.pause(); // Stop ticking sound when timer ends
            tickingSound.currentTime = 0;
          window.location.href = redirectPage;
      }
      timeLeft--;
  }, 1000);
}

function startTimerRunny() {
  startTimer(360, "endTimer.html");
}

function startTimerScrambled() {
  startTimer(300, "endTimer.html");
}

function startTimerSunny() {
  startTimer(240, "endTimer.html");
}

function startTimerHardBoiled() {
  startTimer(720, "endTimer.html");
}

function startOver() {
  window.location.href = "index.html";
}
