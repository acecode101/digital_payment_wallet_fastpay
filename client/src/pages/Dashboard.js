import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [amount, setAmount] = useState('');

  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (error) {
      alert('Error fetching transactions');
    }
  };

  const sendMoney = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/transactions/send',
        { receiverEmail, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Transaction successful!');
      setReceiverEmail('');
      setAmount('');
      fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Transaction failed');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <form onSubmit={sendMoney} className="form">
        <input
          placeholder="Receiver Email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          required
        />
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>

      <h3>Transaction History</h3>
      <ul>
        {transactions.map((txn, i) => (
          <li key={i}>
            {txn.sender.email} ➡️ {txn.receiver.email}: ₹{txn.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
