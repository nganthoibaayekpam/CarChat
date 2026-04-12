const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Ensure this still points to your live Vercel endpoint
const BACKEND_URL = "https://car-chat-backend-eta.vercel.app/getCarInfo";

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Show the user's message
    appendMessage(text, 'user-msg');
    userInput.value = '';

    // Create the special "Searching" loader
    const loadingId = 'loader-' + Date.now();
    const loaderHTML = `
        <div class="loader-container" id="${loadingId}">
            <div class="spinner"></div>
            <span>Searching...</span>
        </div>
    `;
    
    // Smooth transition: remove greeting, add message
    const greeting = document.querySelector('.greeting-container');
    if (greeting) greeting.style.display = 'none';
    
    chatBox.insertAdjacentHTML('beforeend', loaderHTML);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(`${BACKEND_URL}?message=${encodeURIComponent(text)}`);
        const data = await response.json();
        
        document.getElementById(loadingId).remove();
        
        if (data.reply) {
            appendMessage(data.reply, 'bot-msg');
        } else {
            appendMessage("Error: " + data.error, 'bot-msg');
        }
    } catch (error) {
        document.getElementById(loadingId).remove();
        appendMessage("Connection error to Vercel.", 'bot-msg');
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.textContent = text;
    
    // Assign a unique ID so we can target and remove temporary loading messages
    const id = 'msg-' + Date.now();
    msgDiv.id = id;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    
    return id;
}

// Dynamics for suggestion cards
function setInput(text) {
    userInput.value = text;
    userInput.focus();
}

// Allow sending by pressing the Return/Enter key
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});