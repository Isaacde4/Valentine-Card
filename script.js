document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("cardForm");
  const envelopeContainer = document.getElementById("envelopeContainer");
  const envelope = document.getElementById("envelope");
  const cardMessage = document.getElementById("cardMessage");

  const acceptBtn = document.getElementById("acceptBtn");
  const declineBtn = document.getElementById("declineBtn");
  const loveBubbles = document.getElementById("loveBubbles");

  const backgroundHeartsContainer = document.querySelector(".background-hearts");

  let senderName = "";
  let recipientName = "";

  // FORM SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    senderName = document.getElementById("sender").value;
    recipientName = document.getElementById("recipient").value;
    const message = document.getElementById("message").value;

    document.getElementById("displaySender").textContent = senderName;
    document.getElementById("displayRecipient").textContent = recipientName;
    document.getElementById("displayMessage").textContent = message;

    document.getElementById("envelopeSender").textContent = `From: ${senderName}`;

    form.style.display = "none";
    envelopeContainer.style.display = "block";
  });

  // ENVELOPE CLICK
  envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => {
      envelopeContainer.style.display = "none";
      cardMessage.style.display = "block";
    }, 800);
  });

  // ACCEPT BUTTON CLICK
  acceptBtn.addEventListener("click", () => {
    loveBubbles.style.display = "block";
    createBubbles(20);

    const happyMessage = document.createElement("h3");
    happyMessage.textContent = `${recipientName} accepted! ${senderName} will be so happy ❤️`;
    loveBubbles.appendChild(happyMessage);

    document.getElementById("responseButtons").style.display = "none";
  });

  // DECLINE BUTTON CLICK
  declineBtn.addEventListener("click", () => {
    const sadMessage = document.createElement("h3");
    sadMessage.textContent = `${recipientName} declined 💔. ${senderName} will be sad 😢`;
    cardMessage.appendChild(sadMessage);

    document.getElementById("responseButtons").style.display = "none";
  });

  // CREATE HEART BUBBLES
  function createBubbles(num) {
    const colors = ["#ff4d6d", "#ff99aa", "#ff66cc", "#ff1a75"];
    for (let i = 0; i < num; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");

      bubble.style.left = Math.random() * 90 + "%";
      bubble.style.animationDuration = 2 + Math.random() * 2 + "s";

      const size = 15 + Math.random() * 15;
      bubble.style.width = bubble.style.height = size + "px";

      const color = colors[Math.floor(Math.random() * colors.length)];
      bubble.style.backgroundColor = color;

      loveBubbles.appendChild(bubble);
    }
  }

  // BACKGROUND FLOATING HEARTS
  function createBackgroundHearts(num) {
    const colors = ["#ff4d6d", "#ff99aa", "#ff66cc"];
    for (let i = 0; i < num; i++) {
      const heart = document.createElement("div");
      heart.classList.add("bg-heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 5 + Math.random() * 5 + "s";
      heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      backgroundHeartsContainer.appendChild(heart);
    }
  }

  createBackgroundHearts(30);
});
