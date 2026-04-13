const BACKEND_URL = 'https://car-chat-backend-eta.vercel.app'; 

const chatHistory = document.getElementById('chat-history');
const userInputBox = document.getElementById('user-input');
const welcomeScreen = document.getElementById('welcome-screen');
const chatHeaderTitle = document.getElementById('chat-header-title');
const recentChatsList = document.getElementById('recent-chats'); // Targets the sidebar

// --- Functions ---

function startNewChat() {
    // 1. Save current chat to the sidebar if it exists
    if (chatHistory.innerHTML.trim() !== '') {
        const historyBtn = document.createElement('button');
        historyBtn.className = 'new-chat-btn'; 
        historyBtn.style.border = 'none';
        historyBtn.style.borderBottom = '1px solid var(--border-glass)';
        historyBtn.style.borderRadius = '0';
        historyBtn.style.textAlign = 'left';
        historyBtn.innerText = chatHeaderTitle.innerText;

        // Store the exact state of the chat
        const savedHTML = chatHistory.innerHTML;
        const savedTitle = chatHeaderTitle.innerText;

        // Restore chat when clicked
        historyBtn.onclick = () => {
            chatHistory.innerHTML = savedHTML;
            chatHeaderTitle.innerText = savedTitle;
            welcomeScreen.style.display = 'none';
        };

        recentChatsList.prepend(historyBtn);
    }

    // 2. Reset main screen
    chatHistory.innerHTML = ''; 
    welcomeScreen.style.display = 'flex'; 
    chatHeaderTitle.innerText = 'Welcome'; 
    userInputBox.value = '';
}

function setInput(text) {
    userInputBox.value = text;
    sendMessage();
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function updateHeaderTitle(text) {
    welcomeScreen.style.display = 'none'; 
    let newTitle = text.charAt(0).toUpperCase() + text.slice(1);
    if (newTitle.length > 30) {
        newTitle = newTitle.substring(0, 30) + '...';
    }
    chatHeaderTitle.innerText = newTitle;
}

async function sendMessage() {
    const message = userInputBox.value.trim();
    if (!message) return;

    updateHeaderTitle(message);
    appendMessage(message, 'user-msg');
    userInputBox.value = '';

    const loaderId = 'loader-' + Date.now();
    appendLoader(loaderId);

    try {
        const response = await fetch(`${BACKEND_URL}/getCarInfo?message=${encodeURIComponent(message)}`);
        const data = await response.json();

        removeLoader(loaderId);

        if (data.reply) {
            appendMessage(data.reply, 'bot-msg');
        } else {
            appendMessage("Error: Could not retrieve data.", 'bot-msg');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        removeLoader(loaderId);
        appendMessage("System error. Please try again later.", 'bot-msg');
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.innerText = text;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight; 
}

function appendLoader(id) {
    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('spinner');
    loaderDiv.id = id;
    chatHistory.appendChild(loaderDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function removeLoader(id) {
    const loader = document.getElementById(id);
    if (loader) {
        loader.remove();
    }
}