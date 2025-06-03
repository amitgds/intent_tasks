const giftCardsContainer = document.querySelector(".gift-cards");
const cards = Array.from(giftCardsContainer.querySelectorAll(".gc-card"));
const cardMessage = document.querySelector(".card-message");
const couponCode = document.querySelector(".coupon-code");

// Fisher-Yates Shuffle
for (let i = cards.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cards[i], cards[j]] = [cards[j], cards[i]];
}

// Append shuffled cards back into the DOM
cards.forEach((card) => giftCardsContainer.appendChild(card));

gsap.registerPlugin(ScrollTrigger);
applyEffect("tab-content");

document.querySelectorAll(".gc-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const cardRect = card.getBoundingClientRect();
    const containerRect = giftCardsContainer.getBoundingClientRect();
    
    // Position message below the card
    cardMessage.style.left = "50%";
    cardMessage.style.transform = "translateX(-50%)";
    cardMessage.style.top = `${cardRect.bottom - containerRect.top + 5}px`;
    
    // Position coupon code below the message
    couponCode.style.left = "50%";
    couponCode.style.transform = "translateX(-50%)";
    couponCode.style.top = `${cardRect.bottom - containerRect.top + cardMessage.offsetHeight + 10}px`;

    if (card.classList.contains("has-value")) {
      // Show coupon code and hide the default message
      cardMessage.style.display = "none";
      couponCode.style.display = "block"; 
    } else {
      // Show default message and hide coupon code
      cardMessage.style.display = "block"; 
      couponCode.style.display = "none";
    }
    
    // Animation to show elements
    cardMessage.classList.add("hide");
    couponCode.classList.add("hide");
    setTimeout(() => {
      cardMessage.classList.remove("hide");
      couponCode.classList.remove("hide");
    }, 500);
  });

  card.addEventListener("mouseleave", () => {
    setTimeout(() => {
      cardMessage.classList.add("hide");
      couponCode.classList.add("hide");
    }, 300);
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