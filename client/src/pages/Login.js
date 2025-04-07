import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    onLogin();
  };

  return (
    <form onSubmit={handleLogin} style={{ margin: '2rem' }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} /><br />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
