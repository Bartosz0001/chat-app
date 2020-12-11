const express = require('express');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/client')));

const messages = [];
const users = [];

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);
io.set('transports', [ 'websocket' ]);

io.on('connection', (socket) => {
    console.log('New client. It\'s id: ', socket.id);
    socket.on('message', (message) => {
        messages.push({author: message.author, content: message.content});
        socket.broadcast.emit('message', message);
    });
    socket.on('logged', (user) => {
        users.push({name: user, id: socket.id});
        socket.broadcast.emit('message', { author: 'Chat bot', content: `${user} has joined the conversation!`});
    });
    socket.on('disconnect', () => {
        const index = users.findIndex(item => item.id === socket.id);
        socket.broadcast.emit('message', { author: 'Chat bot', content: `${users[index].name} has left the conversation!`});
        users.splice(index, 1);
    });
});