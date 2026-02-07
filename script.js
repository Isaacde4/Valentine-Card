// Elements
const formContainer = document.getElementById("formContainer");
const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");
const messageInput = document.getElementById("message");
const generateBtn = document.getElementById("generateLink");
const shareLinkInput = document.getElementById("shareLink");
const whatsappBtn = document.getElementById("whatsappBtn");

const envelopeContainer = document.getElementById("envelopeContainer");
const flap = document.getElementById("flap");
const fullMessageElem = document.getElementById("fullMessage");
const acceptBtn = document.getElementById("accept");
const declineBtn = document.getElementById("decline");
const heartsContainer = document.getElementById("heartsContainer");

// Create shareable link
generateBtn.addEventListener("click", function() {
    const sender = encodeURIComponent(senderInput.value);
    const receiver = encodeURIComponent(receiverInput.value);
    const message = encodeURIComponent(messageInput.value);

    if(!sender || !receiver){
        alert("Please enter both your name and recipient name.");
        return;
    }

    const url = `${window.location.origin}${window.location.pathname}?sender=${sender}&receiver=${receiver}&msg=${message}`;
    shareLinkInput.value = url;
    shareLinkInput.select();
    document.execCommand("copy");
    alert("Link copied! Send it to your Valentine 💖");

    // WhatsApp share button
    whatsappBtn.classList.remove("hidden");
    const whatsappText = `Hi ${decodeURIComponent(receiver)}, check out your Valentine card: ${url}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
    whatsappBtn.onclick = () => window.open(whatsappLink, "_blank");
});

// On page load: show envelope only if URL has sender & receiver (receiver view)
window.addEventListener("load", function() {
    const params = new URLSearchParams(window.location.search);
    const sender = params.get("sender");
    const receiver = params.get("receiver");
    const msg = params.get("msg");

    if(sender && receiver){
        // Hide sender form
        formContainer.classList.add("hidden");
        // Show envelope for receiver
        envelopeContainer.classList.remove("hidden");

        // Construct full message
        let finalMsg = msg ? `${msg}. Will you be my Valentine?` : "Will you be my Valentine?";
        fullMessageElem.textContent = `${receiver}, ${finalMsg}`;
        window.senderName = sender; // store globally
    } else {
        // No URL params → sender view
        envelopeContainer.classList.add("hidden");
        formContainer.classList.remove("hidden");
        whatsappBtn.classList.add("hidden");
    }
});

// Envelope animation (click to open)
envelopeContainer.addEventListener("click", function() {
    flap.style.transform = "rotateX(-180deg)";
});

// Accept / Decline buttons
acceptBtn.addEventListener("click", function() {
    showHearts(`Yes! ${window.senderName} will be so happy!`);
});

declineBtn.addEventListener("click", function() {
    fullMessageElem.textContent = `No. ${window.senderName} will be sad.`;
});

// Heart bubbles animation
function showHearts(text){
    fullMessageElem.textContent = text;
    for(let i=0; i<30; i++){
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 90 + "%";
        heart.style.animationDuration = 3 + Math.random() * 2 + "s";
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}
