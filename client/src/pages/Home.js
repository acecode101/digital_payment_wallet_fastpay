// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)',
      color: '#fff',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem' }}>Welcome to Paytm Clone 💸</h1>
      <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Securely manage your wallet, make payments, and track transactions.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login">
          <button style={{
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#fff',
            color: '#007bff',
            cursor: 'pointer'
          }}>
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button style={{
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer'
          }}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
