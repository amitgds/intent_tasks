document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  applyEffect("tab-content");

  // Task 4 Logic
  const quizData = [
    { question: "Who is this fragrance for?", options: ["For him", "For her"] },
    { question: "This fragrance will mostly be worn in the...", options: ["Daytime", "Evening"] },
  ];

  let currentQuestion = 0;

  const startQuizButton = document.getElementById("start-quiz");
  if (startQuizButton) {
    startQuizButton.addEventListener("click", () => {
      document.getElementById("quiz-title").style.display = "none";
      document.getElementById("quiz-description").style.display = "none";
      document.getElementById("start-quiz").style.display = "none";
      document.getElementById("quiz-content").style.display = "block";
      loadQuestion();
    });
  }

  function loadQuestion() {
    if (currentQuestion < quizData.length) {
      document.getElementById("question-text").textContent = quizData[currentQuestion].question;
      const optionsContainer = document.getElementById("options");
      optionsContainer.innerHTML = "";
      quizData[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.dataset.next = index;
        button.textContent = option;
        optionsContainer.appendChild(button);
      });
    } else {
      document.getElementById("quiz-content").innerHTML = "<p>Thank you for completing the quiz!</p>";
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.matches(".quiz-options button")) {
      currentQuestion++;
      loadQuestion();
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