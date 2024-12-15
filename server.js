require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const onConnection = require("./server/socket_events.js");
const apiRouts = require("./server/routs.js");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

apiRouts(app);

io.on('connection', socket => onConnection(socket));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`js server runing at http://localhost:${PORT}`);
});
