const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');



const app = express();
app.use(cors());


const serverInstance = http.createServer(app);

const io = new Server(serverInstance, {
   cors: {
        origin: "*",
        methods: ["GET", "POST"]
   }  
});


serverInstance.listen(3000, () => {
    console.log('Server is running on port 3000');
});
