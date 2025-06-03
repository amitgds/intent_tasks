document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger if available
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    applyEffect("tab-content");
  } else {
    console.error("GSAP or ScrollTrigger is not loaded.");
  }

  // Task 3 Logic
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");

  if (slides.length > 0) {
    slides[currentIndex].classList.add("active");

    setInterval(() => {
      // Fade out current slide
      slides[currentIndex].classList.remove("active");
      slides[currentIndex].style.opacity = 0;

      // Move to next slide
      currentIndex = (currentIndex + 1) % slides.length;

      // Fade in next slide
      slides[currentIndex].classList.add("active");
      slides[currentIndex].style.opacity = 1;
    }, 2000); // Add a duration for the interval (e.g., 2000ms)

    // Initialize all slides opacity
    slides.forEach((slide, idx) => {
      slide.style.transition = "opacity 0.5s";
      slide.style.opacity = idx === currentIndex ? 1 : 0;
    });
  }

  function applyEffect(className) {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.from(`.${className}`, {
        scrollTrigger: `.${className}`,
        y: -70,
        opacity: 0,
        duration: 1,
      });
    }
  }
});