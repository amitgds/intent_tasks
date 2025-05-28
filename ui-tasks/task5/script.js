document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  applyEffect("tab-content");

  // Task 5 Logic
  if (!document.querySelector('link[href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
    document.head.appendChild(link);
  }

  let targetsHit = 0;

  document
    .querySelectorAll(".message-container")
    .forEach((el) => (el.style.display = "none"));
    
  let currentTargetIndex = 0;
  const gameContainer = document.querySelector(".game-container");
  if (gameContainer && gameContainer.querySelector(".target")) {
    gameContainer.querySelectorAll(".target").forEach((target) => target.remove());
  }

  const timerDisplay = document.querySelector(".timer");

  const targetIcons = [
    '<i class="bi bi-cup target"></i>',
    '<i class="bi bi-circle target"></i>',
    '<i class="bi bi-dribbble target"></i>',
  ];

  let targetTimeout;
  let countdown;

  function startTimer() {
    let timeLeft = 5;
    if (timerDisplay) {
      timerDisplay.textContent = `Time: ${timeLeft}s`;
    }

    countdown = setInterval(() => {
      timeLeft--;
      if (timerDisplay) {
        timerDisplay.textContent = `Time: ${timeLeft}s`;
      }

      if (timeLeft <= 0) {
        clearInterval(countdown);
      }
    }, 1000);
  }

  function generateTarget() {
    if (currentTargetIndex >= 5) return;

    if (gameContainer && gameContainer.querySelector(".target")) {
      gameContainer.querySelectorAll(".target").forEach((target) => target.remove());
    }

    const target = document.createElement("div");
    target.classList.add("target");
    const x = Math.random() * (gameContainer.offsetWidth-50);
    const y = Math.random() * (gameContainer.offsetHeight-50);
    const randomIcon = targetIcons[Math.floor(Math.random() * targetIcons.length)];
    target.style.top = `${y}px`;
    target.style.left = `${x}px`;
    target.innerHTML = randomIcon;

    if (gameContainer) {
      gameContainer.appendChild(target);
    }
    startTimer();
  }

  // Remove any existing listeners to avoid duplicates
  document.removeEventListener("click", handleTargetClick);

  function handleTargetClick(e) {
    
    
    if (e.target.matches(".target")) {
      
      clearTimeout(targetTimeout);
      clearInterval(countdown);
      e.target.remove();
      targetsHit++;
      currentTargetIndex++;

      if (targetsHit >= 4) {
        gameContainer.style.transition = "opacity 0.4s";
        gameContainer.style.opacity = "0";
        setTimeout(() => {
          gameContainer.style.display = "none";
          document.querySelectorAll(".message-container").forEach((el) => {
            el.style.display = "block";
            el.style.opacity = "0";
            setTimeout(() => {
              el.style.opacity = "1";
            }, 10);
          });
        }, 400);
      } else {
        setTimeout(generateTarget, 500);
      }

      const targetsHitDisplay = document.querySelector(".targetsHit");
      if (targetsHitDisplay) {
        targetsHitDisplay.textContent = targetsHit;
      }
    }
  }

  document.addEventListener("click", handleTargetClick);

  document.querySelectorAll(".start-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".startArea")
        .forEach((el) => (el.style.display = "none"));
      document
        .querySelectorAll(".message-container")
        .forEach((el) => (el.style.display = "none"));
      if (gameContainer && gameContainer.querySelector(".target")) {
        gameContainer.querySelectorAll(".target").forEach((target) => target.remove());
      }

      targetsHit = 0;
      currentTargetIndex = 0;
      generateTarget();
    });
  });



  function applyEffect(className) {
    gsap.from(`.${className}`, {
      scrollTrigger: `.${className}`,
      y: -70,
      opacity: 0,
      duration: 1,
    });
  }
});