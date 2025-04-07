import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', formData);
      localStorage.setItem('token', res.data.token);
      alert('Signup successful');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Sign Up</h2>
      <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
