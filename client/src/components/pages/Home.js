import React, { useEffect, useContext } from 'react';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Chat from '../features/Chat';
import Main from '../features/Main';
import Side from '../features/Side';
import { socketContext } from '../../context/socket';
import { userContext } from '../../context/user';

const Home = () => {
  const socket = useContext(socketContext);
  const {userName, setUserName} = useContext(userContext);

  useEffect(() => {
    console.log('user in Home: ', userName);

    socket.emit('logged', userName);
  }, []);
  
  return(
    <div>
      <Header />

      <div className='container'>
        <Side />
        <Main />
        <Chat />
      </div>

      <Footer />
    </div>
  );
};

export default Home;