const socket = io();
var roomId = '';

const form = document.getElementById('form');
const input = document.getElementById('input');
const leaveRoomButton = document.getElementById('leave');

const message = document.getElementById('messages');
const joinButton = document.getElementById('join-romm');
const inputRoomId = document.getElementById('input-room');
const cardJoinToRoom = document.getElementById('card-room');


joinButton.addEventListener(('click'),(e) => {
    e.preventDefault();
    if (!inputRoomId.value) return;
    roomId = inputRoomId.value.trim()
    socket.emit('join',inputRoomId.value)
    form.style.visibility = 'visible'
    cardJoinToRoom.style.visibility = 'hidden'
})

leaveRoomButton.addEventListener(('click'), (e) => {
    socket.emit('leave',roomId);
    roomId = '';
})

form.addEventListener(('submit'),async (e) => {
    e.preventDefault();
    if (!input.value) return;
    socket.emit('chat message',roomId,input.value);
    input.value = '';
})

// Afficher le message dans ul>li
// Et scroller en bas
socket.on('chat message', (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    message.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight);
})

window.visualViewport.addEventListener(('resize'), () => {
    const keyBoardHeight = window.innerHeight - window.visualViewport.height;
    // window.body.style.height = window.visualViewport.height + 'px';
    // input.style.marginBottom = keyBoardHeight + 'px'
    // socket.emit('chat message',roomId,(keyBoardHeight+'px'))
})
