document.addEventListener("DOMContentLoaded", () => {
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
  const quizTitle = document.getElementById("quiz-title");
  const quizDescription = document.getElementById("quiz-description");
  const quizContent = document.getElementById("quiz-content");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options");

  startQuizButton?.addEventListener("click", () => {
    quizTitle.style.display = "none";
    quizDescription.style.display = "none";
    startQuizButton.style.display = "none";
    quizContent.style.display = "block";
    loadQuestion();
  });

  function loadQuestion() {
    if (currentQuestion < quizData.length) {
      questionText.textContent = quizData[currentQuestion].question;
      optionsContainer.innerHTML = "";
      quizData[currentQuestion].options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        optionsContainer.appendChild(button);
      });
    } else {
      quizContent.innerHTML = "<p>Thank you for completing the quiz!</p>";
    }
  }

  optionsContainer?.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
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