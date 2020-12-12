import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './start.scss';

const Start = () => {
    let [inputValue, setInputValue] = useState('');
    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputValue === '') alert('You have to enter your name!');
        else {
            history.push('/home', {name: inputValue});
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