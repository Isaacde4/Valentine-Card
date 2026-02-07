// ===== ELEMENTS =====
const form = document.getElementById("formContainer");
const envelopeView = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const card = document.getElementById("card");
const message = document.getElementById("message");

const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");
const linkBox = document.getElementById("shareLink");

const generateBtn = document.getElementById("generateLink");
const whatsappBtn = document.getElementById("whatsappBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hearts = document.getElementById("hearts");

// ===== URL PARAMS =====
const params = new URLSearchParams(window.location.search);
const sender = params.get("s");
const receiver = params.get("r");

// ===== RECEIVER MODE =====
if (sender && receiver) {
  form.style.display = "none";
  envelopeView.style.display = "flex";

  envelope.onclick = () => {
    flap.style.transform = "rotateX(-180deg)";
    setTimeout(() => {
      card.style.display = "block";
      message.innerHTML = `${receiver}, will you be my Valentine? 💌`;
    }, 500);
  };
}

// ===== GENERATE LINK =====
generateBtn.onclick = () => {
  const s = senderInput.value.trim();
  const r = receiverInput.value.trim();

  if (!s || !r) {
    alert("Please fill in both names");
    return;
  }

  const base = window.location.origin + window.location.pathname;
  const link = `${base}?s=${encodeURIComponent(s)}&r=${encodeURIComponent(r)}`;

  linkBox.style.display = "block";
  linkBox.value = link;
  linkBox.select();
  document.execCommand("copy");

  whatsappBtn.style.display = "block";

  const text = `I made a Valentine card for you 💖\n\n${link}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;

  whatsappBtn.onclick = () => {
    window.open(waLink, "_blank");
  };
};

// ===== YES =====
yesBtn.onclick = () => {
  message.innerHTML = `${sender} will be so happy 💖`;
  for (let i = 0; i < 25; i++) createHeart();
};

// ===== NO =====
noBtn.onclick = () => {
  message.innerHTML = `${sender} will be sad 💔`;
};

// ===== HEARTS =====
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}
