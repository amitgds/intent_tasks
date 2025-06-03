document.addEventListener("DOMContentLoaded", () => {
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
  let currentTargetIndex = 0;
  let countdown;

  const gameContainer = document.querySelector(".game-container");
  const timerDisplay = document.querySelector(".timer");
  const targetIcons = [
    '<i class="bi bi-cup target"></i>',
    '<i class="bi bi-circle target"></i>',
    '<i class="bi bi-dribbble target"></i>',
  ];

  // Hide all message containers
  document.querySelectorAll(".message-container").forEach(el => el.style.display = "none");

  // Remove existing targets
  gameContainer?.querySelectorAll(".target").forEach(target => target.remove());

  const startTimer = () => {
    let timeLeft = 5;
    if (timerDisplay) timerDisplay.textContent = `Time: ${timeLeft}s`;

    countdown = setInterval(() => {
      timeLeft--;
      if (timerDisplay) timerDisplay.textContent = `Time: ${timeLeft}s`;
      if (timeLeft <= 0) clearInterval(countdown);
    }, 1000);
  };

  const generateTarget = () => {
    if (currentTargetIndex >= 5) return;

    if (gameContainer) {
      gameContainer.querySelectorAll(".target").forEach(target => target.remove());

      const target = document.createElement("div");
      target.classList.add("target");
      const x = Math.random() * (gameContainer.offsetWidth - 50);
      const y = Math.random() * (gameContainer.offsetHeight - 50);
      const randomIcon = targetIcons[Math.floor(Math.random() * targetIcons.length)];
      Object.assign(target.style, {
        top: `${y}px`,
        left: `${x}px`
      });
      target.innerHTML = randomIcon;

      gameContainer.appendChild(target);
      startTimer();
    }
  };

  // Remove any existing listeners to avoid duplicates
  document.removeEventListener("click", handleTargetClick);

  function handleTargetClick(e) {
    if (e.target.matches(".target")) {
      clearInterval(countdown);
      e.target.remove();
      targetsHit++;
      currentTargetIndex++;

      if (targetsHit >= 4) {
        if (gameContainer) {
          gameContainer.style.transition = "opacity 0.4s";
          gameContainer.style.opacity = "0";
          setTimeout(() => {
            gameContainer.style.display = "none";
            document.querySelectorAll(".message-container").forEach(el => {
              el.style.display = "block";
              el.style.opacity = "0";
              setTimeout(() => (el.style.opacity = "1"), 10);
            });
          }, 400);
        }
      } else {
        setTimeout(generateTarget, 500);
      }

      const targetsHitDisplay = document.querySelector(".targetsHit");
      if (targetsHitDisplay) targetsHitDisplay.textContent = targetsHit;
    }
  }

  document.addEventListener("click", handleTargetClick);

  document.querySelectorAll(".start-button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".startArea").forEach(el => (el.style.display = "none"));
      document.querySelectorAll(".message-container").forEach(el => (el.style.display = "none"));
      gameContainer?.querySelectorAll(".target").forEach(target => target.remove());
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
