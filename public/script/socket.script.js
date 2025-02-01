const socket = io();

const form = document.getElementById('form')
const input = document.getElementById('input')
const message = document.getElementById('messages');
const quitButton = document.getElementById('quit')

form.addEventListener(('submit'),async (e) => {
    e.preventDefault();
    // if (input.value) {
    //     socket.emit('chat message', input.value);
    //     input.value = '';
    // };

    // try {
    //     const response = await socket.timeout(5000).emitWithAck('request',{ foo: 'bar' }, 'baz')
    //     console.log(response.status); // ok
    // } catch (error) {
    //     // the server did not acknowledge the event in the given delay
    // }

    socket.emit('tonga soa');
})

quitButton.addEventListener(('click'),(e) => {
    socket.emit('hiala');
})

// Afficher le message dans ul>li
// Et scroller en bas
socket.on('chat message', (msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    message.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight);
})

socket.on('hello',(msg) => {
    const item = document.createElement('li')
    item.textContent = msg
    message.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight);
})