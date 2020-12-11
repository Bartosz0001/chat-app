import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import Message from './Message';

const Chat = (props) => {
    let [messages, addMessage] = useState([]);
    let [inputValue, setInputValue] = useState('');
    const [socket, setSocket] = useState();

    useEffect(() => {
        const connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "timeout" : 10000, //before connect_error and connect_timeout are emitted.
            "transports" : ["websocket"]
          };
          
        const socket = io('http://localhost:8000', connectionOptions);
        setSocket(socket);

        socket.emit('logged', props.userName);

        socket.on('message', (newMessage) => {
            addMessage(prevMessages => [...prevMessages, newMessage]);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        addMessage(prevMessages => [...prevMessages, {author: props.userName, content: inputValue}]);
        socket.emit('message', {author: props.userName, content: inputValue});
        setInputValue('');
    }

    return (
    <section className='chat-box'>
        <ul className='messages'>{messages.map(message => (
            <Message key={uuidv4()} {...message} />
        ))}</ul>
        <form className='add-message' onSubmit={handleSubmit}>
            <input 
            className='message-input' 
            type='text' 
            placeholder='Write a message'
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)} />
            <button className='message-btn' type='submit'>Send</button>
        </form>
    </section>
    );
};

Chat.propTypes = {
    userName: PropTypes.string.isRequired,
};

export default Chat;