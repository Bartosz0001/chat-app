import React, { useEffect, useState, useRef, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { socketContext } from '../../context/socket';
import { userContext } from '../../context/user';

import Message from './Message';
import './chat.scss';

const Chat = () => {
    let [messages, addMessage] = useState([]);
    let [inputValue, setInputValue] = useState('');
    const scrollElement = useRef();
    const socket = useContext(socketContext);
    const { userName, setUserName } = useContext(userContext);

    useEffect(() => {
        console.log('user in chat: ', userName);
        socket.on('message', (newMessage) => {
            addMessage(prevMessages => [...prevMessages, newMessage]);
        });
    }, []);

    useEffect(() => {
        scrollElement.current.scrollIntoView({ behavior: "smooth" });
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputValue !== '') {
            addMessage(prevMessages => [...prevMessages, {author: userName, content: inputValue, type: 'self'}]);
            socket.emit('message', {author: userName, content: inputValue, type: 'other'});
            setInputValue('');
        }
    }

    return (
    <section className='chat-box'>
        <div className='message-list'>
          <ul className='messages'>{messages.map(message => (
            <Message key={uuidv4()} {...message} />
          ))}
            <div ref={scrollElement} />
          </ul>
        </div>
        <form className='add-message' onSubmit={handleSubmit}>
            <input 
            className='input' 
            type='text' 
            placeholder='Write a message'
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)} />
            <button className='btn' type='submit'>Send</button>
        </form>
    </section>
    );
};

export default Chat;