const form = document.getElementById("formContainer");
const envelopeView = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const card = document.getElementById("card");
const messageBox = document.getElementById("message");

const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");
const customMessageInput = document.getElementById("customMessage");

const generateBtn = document.getElementById("generateLink");
const whatsappBtn = document.getElementById("whatsappBtn");
const linkBox = document.getElementById("shareLink");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hearts = document.getElementById("hearts");

// ===== URL PARAMS =====
const params = new URLSearchParams(window.location.search);
const sender = params.get("s");
const receiver = params.get("r");
const msg = params.get("m");

// ===== RECEIVER MODE =====
if (sender && receiver) {
  form.style.display = "none";
  envelopeView.style.display = "flex";

  envelope.onclick = () => {
    flap.style.transform = "rotateX(-180deg)";
    setTimeout(() => {
      envelope.style.display = "none";
      card.style.display = "block";

      let finalMessage = "";
      if (msg) finalMessage += msg + "<br><br>";
      finalMessage += `<strong>Will you be my Valentine?</strong> 💌`;

      messageBox.innerHTML = finalMessage;
    }, 500);
  };
}

// ===== GENERATE LINK =====
generateBtn.onclick = () => {
  const s = senderInput.value.trim();
  const r = receiverInput.value.trim();
  const m = customMessageInput.value.trim();

  if (!s || !r) {
    alert("Please enter both names");
    return;
  }

  const base = window.location.origin + window.location.pathname;
  const link =
    `${base}?s=${encodeURIComponent(s)}&r=${encodeURIComponent(r)}&m=${encodeURIComponent(m)}`;

  linkBox.style.display = "block";
  linkBox.value = link;
  linkBox.select();
  document.execCommand("copy");

  whatsappBtn.style.display = "block";

  const text = `I made a Valentine card for you 💖\n\n${link}`;
  whatsappBtn.onclick = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
};

// ===== YES =====
yesBtn.onclick = () => {
  messageBox.innerHTML = `<strong>${sender}</strong> will be so happy 💖`;
  for (let i = 0; i < 30; i++) createHeart();
};

// ===== NO =====
noBtn.onclick = () => {
  messageBox.innerHTML = `<strong>${sender}</strong> will be sad 💔`;
};

// ===== HEARTS =====
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}
