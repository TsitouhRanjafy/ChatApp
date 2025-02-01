import express from 'express';
import { createServer } from 'node:http';
import  path  from "node:path"
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
// Initialise une nouvelle instance de socket.io 
// en passant le server (http) objet.
const io = new Server(server)

const cheminStatic = path.join(__dirname,'../public')

app.use(express.static(cheminStatic))

app.get('/', (req, res) => {
  res.sendFile(path.join(cheminStatic,'index.html'));
});

// ecoute le connection événement pour les sockets entrants et connectez-le à la console 
io.on('connection', (socket) => {
    console.log('as user connected'); // à chaque client connecter
    socket.on('disconnect',() => {
      console.log('user disconnected'); // à chaque client déconnecter
    })
    //  imprimons le chat message événement
    socket.on('chat message',(msg) => {
      console.log('message:',msg);
    })
})

server.listen(3000, () => {
  console.log(' server running at http://localhost:3000');
});
