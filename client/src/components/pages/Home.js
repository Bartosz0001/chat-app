import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Home = () => (
    <div>
      <Header />

      <div className='container'>
        <div className='side'></div>
        <div className='main'></div>
        <div className='chat'></div>
      </div>

      <Footer />
    </div>
);

export default Home;