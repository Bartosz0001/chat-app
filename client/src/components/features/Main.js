import React, { useContext, useEffect, useState } from 'react';
import { socketContext } from '../../context/socket';
import { v4 as uuidv4 } from 'uuid';

import Post from './Post';
import './main.scss';

const Main = () => {
    let [posts, addPost] = useState([]);
    const socket = useContext(socketContext);

    useEffect(() => {
        socket.on('post', (newPost) => {
            addPost(prevPosts => [{ author: newPost.author, title: newPost.title, text: newPost.text, img: newPost.img }, ...prevPosts]);
        });
    }, []);

    return(
        <section className='main-content'>
          <div className='post-list'>
            <ul className='posts'>{posts.map(post => (
                <Post key={uuidv4()} {...post} />
            ))}</ul>
          </div>
        </section>
    );
};

export default Main;