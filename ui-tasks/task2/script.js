document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  applyEffect("tab-content");

  // Task 2 Logic
  // Show little-ballon
  const boxContainer = document.getElementsByClassName("little-ballon");
  if (boxContainer[0]) {
    boxContainer[0].style.display = "block";
  }

  // Hide coupon-ballon initially
  document
    .querySelectorAll(".coupon-ballon")
    .forEach((el) => (el.style.display = "none"));

  const colors = ["rgba(140, 18, 4, 1)", "rgba(5, 88, 166, 1)"];

  // Clear existing balloons and their styles
  const backgroundBalloons = document.getElementById("backgroundBalloons");
  if (backgroundBalloons) {
    backgroundBalloons.innerHTML = ""; // Remove all existing balloons
  }
  document.querySelectorAll('style[id^="balloon-"]').forEach((style) => style.remove());

  // Generate new balloons
  for (let i = 0; i < 5; i++) {
    createBalloon(i);
  }

  // Remove existing event listeners to prevent duplicates
  document.querySelectorAll(".balloon").forEach((balloon) => {
    balloon.removeEventListener("click", handleBalloonClick);
  });
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.removeEventListener("click", handleCopyClick);
  });

  // Add event listener for balloon clicks
  function handleBalloonClick(e) {
    const balloon = e.currentTarget;
    if (balloon.classList.contains("popping")) return;

    balloon.classList.add("popping");

    balloon.style.transform = "scale(1.5)";
    balloon.style.opacity = "0";
    balloon.style.transition = "all 0.3s ease-out";

    const container = document.querySelector(".game-container");
    if (!container) {
      console.error("Game container not found!");
      return;
    }

    // Get the position of the balloon relative to the game-container
    const containerRect = container.getBoundingClientRect();
    const balloonRect = balloon.getBoundingClientRect();

    // Calculate the position relative to the game-container
    const relativeX = balloonRect.left - containerRect.left + balloonRect.width / 2;
    const relativeY = balloonRect.top - containerRect.top + balloonRect.height / 2;
    const color = "#04aa6d";

    // Create particles at the adjusted position
    for (let i = 0; i < 12; i++) {
      createParticle(relativeX, relativeY, color, container);
    }

    setTimeout(() => {
      balloon.remove();

      if (!document.querySelectorAll(".balloon").length) {
        const discountText = document.getElementById("discount-text");
        if (discountText) {
          discountText.style.display = "none";
          discountText.style.opacity = "0";
          setTimeout(() => {
            discountText.style.display = "none";
          }, 500);
        }

        document.querySelectorAll(".coupon-ballon").forEach((el) => {
          el.style.display = "block";
          el.style.opacity = "0";
          setTimeout(() => {
            el.style.opacity = "1";
          }, 10);
        });
      }
    }, 300);
  }

  document.querySelectorAll(".balloon").forEach((balloon) => {
    balloon.addEventListener("click", handleBalloonClick);
  });

  // Add event listener for copy button
  function handleCopyClick(e) {
    const btn = e.currentTarget;
    const textToCopy = document.getElementById("copy-text").textContent;
    const tempTextarea = document.createElement("textarea");
    document.body.appendChild(tempTextarea);
    tempTextarea.value = textToCopy;
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    btn.textContent = "Copied!";
  }

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", handleCopyClick);
  });

  function createBalloon(index) {
    const size = 20 + Math.random() * 40;
    const left = Math.random() * 100;
    const duration = 25 + Math.random() * 35;
    const delay = Math.random() * 20;
    const color = colors[Math.floor(Math.random() * colors.length)];

    const balloonId = "balloon-" + Date.now() + "-" + Math.floor(Math.random() * 500);
    const balloon = document.createElement("div");
    balloon.classList.add("bg-balloon");
    balloon.id = balloonId;
    balloon.innerHTML = '<div class="bg-balloon-thread"></div>';
    Object.assign(balloon.style, {
      "--balloon-color": color,
      width: `${size}px`,
      height: `${size * 1.25}px`,
      left: `${left}%`,
      animationDuration: `${duration}s`,
      background: color,
    });

    const styleRule = `
      #${balloonId}::before {
        content: "▲";
        left: 50%;
        font-size: 20px;
        color: ${color};
        display: block;
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: -10px;
        z-index: -100;
        transform: translateX(-50%);
      }`;

    const styleElement = document.createElement("style");
    styleElement.id = balloonId;
    styleElement.type = "text/css";
    styleElement.textContent = styleRule;
    document.head.appendChild(styleElement);

    const backgroundBalloonsContainer = document.getElementById("backgroundBalloons");
    if (backgroundBalloonsContainer) {
      backgroundBalloonsContainer.appendChild(balloon);
    }

    balloon.addEventListener("click", handleBalloonClick);

    setTimeout(() => {
      balloon.remove();
      styleElement.remove();
      createBalloon(index);
    }, (duration + delay) * 500);
  }

  function createParticle(x, y, color, container) {
    const size = 5 + Math.random() * 8;
    const particle = document.createElement("div");
    particle.classList.add("particle");

    Object.assign(particle.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 1000,
    });

    container.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    gsap.to(particle, {
      duration: 0.5 + Math.random(),
      x: dx,
      y: dy,
      opacity: 0,
      ease: "linear",
      onComplete: () => {
        particle.remove();
      },
    });
  }

  function applyEffect(className) {
    gsap.from(`.${className}`, {
      scrollTrigger: `.${className}`,
      y: -70,
      opacity: 0,
      duration: 1,
    });
  }
});