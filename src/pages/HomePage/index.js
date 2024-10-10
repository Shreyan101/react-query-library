import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ width: '100%', backgroundColor: 'black', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <h2>Home</h2>
        </Link>
        <Link to='/hotel' style={{ textDecoration: 'none', color: 'white' }}>
          <h2>Hotel</h2>
        </Link>
        <Link
          to='/hotel/pagination'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <h2>Hotel pagination</h2>
        </Link>
        <Link
          to='/hotel/infinitescroll'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <h2>Hotel Page InfiniteScroll</h2>
        </Link>
        <Link
          to='/hotel/hotelsinfinitescrollv2'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <h2>Hotel Page InfiniteScroll V2</h2>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
