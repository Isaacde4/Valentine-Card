const form = document.getElementById("formContainer");
const envelopeView = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const card = document.getElementById("card");
const messageBox = document.getElementById("message");

const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");
const messageInput = document.getElementById("customMessage");

const generateBtn = document.getElementById("generateLink");
const whatsappBtn = document.getElementById("whatsappBtn");
const linkBox = document.getElementById("shareLink");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hearts = document.getElementById("hearts");

const params = new URLSearchParams(window.location.search);
const sender = params.get("s");
const receiver = params.get("r");
const msg = params.get("m");

/* ===== RECEIVER MODE ===== */
if (sender && receiver) {
  form.style.display = "none";
  envelopeView.style.display = "flex";

  envelope.onclick = () => {
    flap.style.transform = "rotateX(-180deg)";
    setTimeout(() => {
      envelope.style.display = "none";
      card.style.display = "block";

      let text = "";
      if (msg) text += msg + "<br><br>";
      text += `<strong>Will you be my Valentine?</strong> 💌`;

      messageBox.innerHTML = text;
    }, 500);
}

/* ===== GENERATE LINK ===== */
generateBtn.onclick = () => {
  const s = senderInput.value.trim();
  const r = receiverInput.value.trim();
  const m = messageInput.value.trim();

  if (!s || !r) {
    alert("Please enter both names");
    return;
  }

  const base = window.location.origin + window.location.pathname;
  const link = `${base}?s=${encodeURIComponent(s)}&r=${encodeURIComponent(r)}&m=${encodeURIComponent(m)}`;

  linkBox.style.display = "block";
  linkBox.value = link;

  whatsappBtn.style.display = "block";
  whatsappBtn.onclick = () => {
    window.location.href =
      `https://wa.me/?text=${encodeURIComponent("I made a Valentine card for you 💖\n\n" + link)}`;
  };
};

/* ===== YES / NO ===== */
yesBtn.onclick = () => {
  messageBox.innerHTML = `<strong>${sender}</strong> will be so happy 💖`;
  for (let i = 0; i < 30; i++) createHeart();
};

noBtn.onclick = () => {
  messageBox.innerHTML = `<strong>${sender}</strong> will be sad 💔`;
};

/* ===== HEARTS ===== */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}}
