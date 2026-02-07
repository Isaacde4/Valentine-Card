window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('sender')) {
        // If the URL has data, show the envelope
        document.getElementById('generator').classList.add('hidden');
        document.getElementById('cardView').classList.remove('hidden');
        document.getElementById('envelopeFrom').innerText = "From: " + params.get('sender');
        
        let msg = params.get('msg');
        document.getElementById('displayMessage').innerText = msg ? msg : "";
    }
};

function shareToWhatsApp() {
    const sender = document.getElementById('senderName').value;
    const receiver = document.getElementById('receiverName').value;
    const msg = document.getElementById('customMessage').value;

    if (!sender || !receiver) {
        alert("Please enter names first!");
        return;
    }

    // This creates the link based on your GitHub URL
    const currentUrl = window.location.href.split('?')[0];
    const link = `${currentUrl}?sender=${encodeURIComponent(sender)}&receiver=${encodeURIComponent(receiver)}&msg=${encodeURIComponent(msg)}`;
    
    const whatsappText = `Hi ${receiver}, I have a surprise for you. Click here to open: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
}

function openEnvelope() {
    document.querySelector('.envelope-wrapper').classList.add('open');
}

function respond(choice) {
    const params = new URLSearchParams(window.location.search);
    const sender = params.get('sender');
    const receiver = params.get('receiver');

    document.getElementById('cardView').classList.add('hidden');
    document.getElementById('successScreen').classList.remove('hidden');
    
    const resultText = document.getElementById('resultText');
    if (choice === 'yes') {
        resultText.innerText = `Yay! ${receiver} said YES! ${sender} will be so happy! ❤️`;
        spawnHearts();
    } else {
        resultText.innerText = `Oh no! ${sender} will be very sad... 💔`;
    }
}

function spawnHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-pop';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '0';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}