import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Paytm Clone</h1>
      <p>Please choose an option:</p>
      <Link to="/signup">
        <button style={{ margin: '10px' }}>Signup</button>
      </Link>
      <Link to="/login">
        <button style={{ margin: '10px' }}>Login</button>
      </Link>
    </div>
  );
};

export default Home;
