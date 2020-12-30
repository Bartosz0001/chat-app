const express = require('express');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/client')));

const messages = [];
const users = [];
const posts = [];
const defaultUserImage = 'https://static.thenounproject.com/png/961-200.png';

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);
io.set('transports', [ 'websocket' ]);

io.on('connection', (socket) => {
    console.log('New client. It\'s id: ', socket.id);
    socket.emit('updateData', posts);

    socket.on('message', (message) => {
        messages.push({author: message.author, content: message.content, type: message.type});
        socket.broadcast.emit('message', message);
    });
    socket.on('logged', (user) => {
        console.log('Logged user: ', user);
        users.push({name: user, id: socket.id});
        socket.broadcast.emit('message', { author: 'Chat bot', content: `${user} has joined the conversation!`, type: 'bot'});
    });
    socket.on('post', (post) => {
        if(post.img) {
            posts.push({author: post.author, title: post.title, text: post.text, img: post.img});
            io.emit('post', {author: post.author, title: post.title, text: post.text, img: post.img});
        }
        else {
            posts.push({author: post.author, title: post.title, text: post.text, img: defaultUserImage});
            io.emit('post', {author: post.author, title: post.title, text: post.text, img: defaultUserImage});
        } 
    });
    socket.on('disconnect', () => {
        const index = users.findIndex(item => item.id === socket.id);
        socket.broadcast.emit('message', { author: 'Chat bot', content: `${users[index].name} has left the conversation!`, type: 'bot'});
        users.splice(index, 1);
    });
});