document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  applyEffect("tab-content");

  // Task 7 Logic
  console.log("Task 7 logic goes here.");

  function applyEffect(className) {
    gsap.from(`.${className}`, {
      scrollTrigger: `.${className}`,
      y: -70,
      opacity: 0,
      duration: 1,
    });
  }
});