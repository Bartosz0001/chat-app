import React, { useContext, useState } from 'react';
import ImageUploader from 'react-images-upload';
import { socketContext } from '../../context/socket';
import { userContext } from '../../context/user';

import './side.scss';

const Side = () => {
    const [toggleElement, setToggleElement] = useState(false);
    let [titleValue, setTitleValue] = useState('');
    let [textValue, setTextValue] = useState('');
    let [image, setImage] = useState(null);
    const socket = useContext(socketContext);
    const { userName, setUserName } = useContext(userContext);

    const setPhoto = (photo) => {
      console.log('photo: ', photo);
        if(photo) setImage(photo[0]);
        else setImage(null);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
    }

    const handleSend = (event) => {
      let error = null;
      if(titleValue === '' || textValue === '') error = 'You cannot leave subject and text fields empty!';
      if(titleValue.length > 50) error = 'Subject cannot be longer than 50 characters!';
      if(textValue.length > 250) error = 'Text cannot be longer than 250 characters!';

      if(!error) {
        setToggleElement(false);
        setTitleValue('');
        setTextValue('');
        if(image) {
          const reader = new FileReader();
          reader.onload = function(event) {
            socket.emit('post', { author: userName, title: titleValue, text: textValue, img: event.target.result });
            };
          reader.readAsDataURL(image);
        }
        else socket.emit('post', { author: userName, title: titleValue, text: textValue })
      }
      else alert(error);
    }

    return (
      <section className='side-box'>
        <button className='add-post-btn btn' onClick={() => setToggleElement(true)}>Add post</button>
        <div className={toggleElement ? 'add-post' : 'hidden'}>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Title' className='input' value={titleValue} onChange={(event) => setTitleValue(event.target.value)} />
                <input type='text' placeholder='Text' className='input' value={textValue} onChange={(event) => setTextValue(event.target.value)} />
                <ImageUploader
                  withIcon={true}
                  label=''
                  buttonText='Add a picture'
                  withPreview={true}
                  singleImage={true}
                  onChange={setPhoto}
                  imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                  maxFileSize={5242880}
                  className='input-image'
                />
                <button type='submit' className='add-post-btn btn' onClick={handleSend}>Add</button>
                <button className='cancel-btn btn' onClick={() => setToggleElement(false)}>Cancel</button>
            </form>
        </div>
      </section>
    )
};

export default Side;