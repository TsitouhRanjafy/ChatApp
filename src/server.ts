import express from 'express';
import { createServer } from 'node:http';
import  path  from "node:path"
import { Server } from 'socket.io';
import  dotenv  from "dotenv"
import  mongoose  from 'mongoose';


dotenv.config();
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/chatapp'
const app = express();
const server = createServer(app);
// Initialise une nouvelle instance de socket.io 
// en passant le server (http) objet.
const io = new Server(server,{
  connectionStateRecovery: {}
})

const cheminStatic = path.join(__dirname,'../public')

app.use(express.static(cheminStatic))

app.get('/', (req, res) => {
  res.sendFile(path.join(cheminStatic,'index.html'));
});



server.listen(PORT, async () => {
  console.log(` server running at http://localhost:${PORT}`);

  try {
    await mongoose.connect(MONGODB_URL)
    console.log(' mongodb connected');
    
  } catch (error) {
    console.log('  error on synchronisation mongodb');
    throw error
  }
});
