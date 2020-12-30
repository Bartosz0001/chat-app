import React from 'react';
import PropTypes from 'prop-types';

import './post.scss';

const Post = (post) => {
    const date = '12.12.2012';
    console.log('Post. Img: ', post.img);
    return(
        <li className='post'>
            <h2 className='post-author'>{post.author}</h2>
            <h2 className='post-date'>{date}</h2>
            <div className='post-image'><img src={post.img} /></div>
            <h2 className='post-title'>{post.title}</h2>
            <p className='post-text'>{post.text}</p>
        </li>
    );
};

Post.propTypes = {};

export default Post;