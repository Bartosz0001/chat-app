import React from 'react';

import './post.scss';

const Post = (post) => {
    return(
        <li className='post'>
            <h2 className='post-author'>{post.author}</h2>
            <h2 className='post-date'>{post.date}</h2>
            <div className='post-image'><img src={post.img} /></div>
            <h2 className='post-title'>{post.title}</h2>
            <p className='post-text'>{post.text}</p>
        </li>
    );
};

export default Post;