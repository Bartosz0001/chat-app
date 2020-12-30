import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../context/user';
import './start.scss';

const Start = () => {
    let [inputValue, setInputValue] = useState('');
    let history = useHistory();
    const { userName, setUserName } = useContext(userContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputValue === '') alert('You have to enter your name!');
        else {
            setUserName(inputValue);
            console.log('user in start: ', userName);
            history.push('/home');
        }
    }

    return(
        <div className='container'>
            <div className='start-box'>
              <h1 className='intro'>Your name:</h1>
              <form onSubmit={handleSubmit}>
                <input className='input' type='text' value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                <button className='btn' type='submit'>OK</button>
              </form>
            </div>
        </div>
    );
}

export default Start;