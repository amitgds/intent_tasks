document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  applyEffect("tab-content");

  // Task 1 Logic
  let selectedReward = "";
  const rewardRadios = document.querySelectorAll('input[name="option"]');
  const spaImage = document.getElementById("spaImage");
  const villaImage = document.getElementById("villaImage");
  const yachtImage = document.getElementById("yachtImage");
  const polaroid = document.getElementById("polaroid");

  rewardRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      selectedReward = radio.value;

      spaImage.style.display = "none";
      villaImage.style.display = "none";
      yachtImage.style.display = "none";

      if (selectedReward === "spa") {
        spaImage.style.display = "block";
      } else if (selectedReward === "villa") {
        villaImage.style.display = "block";
      } else if (selectedReward === "yacht") {
        yachtImage.style.display = "block";
      }
    });
  });

  window.addEventListener("load", () => {
    if (polaroid) {
      polaroid.style.border = "10px solid #fdfdfd";
    }
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