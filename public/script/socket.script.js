const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const message = document.getElementById('messages');
const statusButton = document.getElementById('status');

form.addEventListener(('submit'),async (e) => {
    e.preventDefault();
    if (input.value) {
        if (statusButton.textContent == 'Disconnect') {
            console.log('chat to same room',input.value);
            socket.emit('chat message',{ to: 'same room' },input.value);
        } else {
            console.log('chat except same room',input.value);
            socket.emit('chat message',{ to: 'except same room' },input.value);
        }
        input.value = '';
    }
})

statusButton.addEventListener(('click'),async (e) => {
    if (statusButton.textContent == 'Connect') {
        console.log(statusButton.textContent);
        try {
            const response = await socket.emitWithAck('join')
            if (response.status == 'ok') {
                diffuseAMessage('*connected*')
                statusButton.textContent = 'Disconnect'
            }
        } catch (error) {
            throw error
        }
    } else {
        console.log(statusButton.textContent);
        try {
            const response = await socket.emitWithAck('leave')
            if (response.status == 'ok') {
                diffuseAMessage('*disconnected*')
                statusButton.textContent = 'Connect'
            }
        } catch (error) {
            throw error
        }
    }
    
})

// Afficher le message dans ul>li
// Et scroller en bas
socket.on('chat message', (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    message.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight);
})

const diffuseAMessage = (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    message.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight);
}
