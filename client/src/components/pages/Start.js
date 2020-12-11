import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
            <h1 className='intro'>Your name:</h1>
            <form onSubmit={handleSubmit}>
                <input className='start-input' type='text' value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                <button className='start-btn' type='submit'>OK</button>
            </form>
        </div>
    );
}

export default Start;