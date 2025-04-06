import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to MERN Wallet</h1>
      <div>
        <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
