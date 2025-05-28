document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  applyEffect("tab-content");

 
  document.querySelectorAll(".gc-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("has-value")) {
        const cardMessage = document.querySelector(".card-message");
        if (cardMessage) {
          cardMessage.classList.add("hide");

          setTimeout(() => {
            cardMessage.classList.remove("hide");
          }, 500);
        }
      }
    });

    card.addEventListener("mouseleave", () => {
      setTimeout(() => {
        const cardMessage = document.querySelector(".card-message");
        if (cardMessage) {
          cardMessage.classList.add("hide");
        }
      }, 500);
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