window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('sender')) {
        document.getElementById('generator').classList.add('hidden');
        document.getElementById('cardView').classList.remove('hidden');
        document.getElementById('fromLabel').innerText = "From " + params.get('sender');
        
        const msg = params.get('msg') || "I have a special question for you...";
        document.getElementById('displayMessage').innerText = msg;
    }
};

function generateLink() {
    const sender = document.getElementById('senderName').value;
    const receiver = document.getElementById('receiverName').value;
    const msg = document.getElementById('customMessage').value;

    if (!sender || !receiver) {
        alert("Please enter both names!");
        return;
    }

    const baseUrl = window.location.href.split('?')[0];
    const finalUrl = `${baseUrl}?sender=${encodeURIComponent(sender)}&receiver=${encodeURIComponent(receiver)}&msg=${encodeURIComponent(msg)}`;
    
    document.getElementById('rawLink').value = finalUrl;
    document.getElementById('linkOutput').classList.remove('hidden');

    // Share Links
    const text = `Hi ${receiver}, open this message from ${sender}: ${finalUrl}`;
    document.getElementById('waShare').href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    document.getElementById('emailShare').href = `mailto:?subject=A Message for ${receiver}&body=${encodeURIComponent(text)}`;
    document.getElementById('smsShare').href = `sms:?body=${encodeURIComponent(text)}`;
}

function openEnvelope() {
    document.querySelector('.envelope-container').classList.add('open');
}

function respond(answer, event) {
    event.stopPropagation(); // Prevents clicking the button from closing/opening envelope
    const params = new URLSearchParams(window.location.search);
    const sender = params.get('sender');
    const receiver = params.get('receiver');
    
    document.getElementById('cardView').classList.add('hidden');
    document.getElementById('responseScreen').classList.remove('hidden');
    
    const textEl = document.getElementById('responseText');
    if (answer === 'yes') {
        textEl.innerText = `Yay! ${receiver} said Yes! ${sender} will be the happiest person alive! ❤️`;
        startBubbles();
    } else {
        textEl.innerText = `${sender} will be very sad... 💔`;
    }
}

function startBubbles() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const b = document.createElement('div');
            b.className = 'bubble';
            const size = Math.random() * 20 + 10 + 'px';
            b.style.width = size;
            b.style.height = size;
            b.style.left = Math.random() * 100 + 'vw';
            document.body.appendChild(b);
            setTimeout(() => b.remove(), 4000);
        }, i * 150);
    }
}