// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/');
    const fetchData = async () => {
      const resUser = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: token },
      });
      setUser(resUser.data);

      const resHistory = await axios.get('http://localhost:5000/api/transactions/history', {
        headers: { Authorization: token },
      });
      setHistory(resHistory.data);
    };
    fetchData();
  }, [token, navigate]);

  const handleTransaction = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        { amount: parseFloat(amount) },
        { headers: { Authorization: token } }
      );
      alert('Transaction successful');
      window.location.reload();
    } catch (err) {
      alert('Transaction failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Balance: ₹{user.balance}</p>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransaction}>Send Money</button>

      <h3>Transaction History</h3>
      <ul>
        {history.map((tx, index) => (
          <li key={index}>
            {tx.type} of ₹{tx.amount} on {new Date(tx.date).toLocaleString()}
          </li>
        ))}
      </ul>

      <Link to="/graph">📊 View Graph</Link>
      <br />
      <button onClick={logout} style={{ marginTop: '1rem' }}>Logout</button>
    </div>
  );
};

export default Dashboard;
