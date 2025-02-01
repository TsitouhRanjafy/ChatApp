"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const node_path_1 = __importDefault(require("node:path"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
// Initialise une nouvelle instance de socket.io 
// en passant le server (http) objet.
const io = new socket_io_1.Server(server, {
    connectionStateRecovery: {}
});
const cheminStatic = node_path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(cheminStatic));
app.get('/', (req, res) => {
    res.sendFile(node_path_1.default.join(cheminStatic, 'index.html'));
});
// ecoute le connection événement pour les sockets entrants et connectez-le à la console 
io.on('connection', (socket) => {
    console.log('as user connected'); // à chaque client connecter
    socket.on('disconnect', () => {
        console.log('user disconnected'); // à chaque client déconnecter
    });
    // Diffusion du message
    socket.on('chat message', (destination, msg) => {
        if (destination.to == 'same room') {
            io.to('same room').emit('chat message', msg);
        }
        else if (destination.to == 'except same room') {
            io.except('same room').emit('chat message', msg);
        }
        else {
            io.emit('chat message', destination);
        }
    });
    // Connect to 'same room'
    socket.on('join', (callback) => {
        socket.join('same room');
        callback({
            status: 'ok'
        });
    });
    // Disconnect to 'same room'
    socket.on('leave', (callback) => {
        socket.leave('same room');
        callback({
            status: 'ok'
        });
    });
});
server.listen(3000, () => {
    console.log(' server running at http://localhost:3000');
});
