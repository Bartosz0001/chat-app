import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Chat from '../features/Chat';

const Home = (historyObj) => {
  const name = historyObj.location.state.name;
  return(
    <div>
      <Header />

      <div className='container'>
        <div className='side'></div>
        <div className='main'></div>
        <div className='chat'>
          <Chat userName={name} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;