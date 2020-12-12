import React from 'react';
import PropTypes from 'prop-types';

import './message.scss';

const Message = (message) => {
    const self = 'You';
    return (
      <li className={'message' + (message.type === 'self' ? ' self' : '')}>
        <h3 className='message-author'>{message.type === 'self' ? self : message.author}</h3>
        <p className='message-content'>{message.content}</p>
      </li>
    ); 
}

Message.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default Message;