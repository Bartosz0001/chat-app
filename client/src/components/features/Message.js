import React from 'react';
import PropTypes from 'prop-types';

const Message = (message) => (
    <li>
        <h3 className='message-author'>{message.author}</h3>
        <p className='message-content'>{message.content}</p>
    </li>
);

Message.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Message;