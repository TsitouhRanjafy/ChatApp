const socket = io();

const form = document.getElementById('form')
const input = document.getElementById('input')
const message = document.getElementById('messages');

form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    };
})

// Afficher le message dans ul>li
// Et scroller en bas
socket.on('chat message', (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    message.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight);
})