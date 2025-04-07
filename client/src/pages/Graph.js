// client/src/pages/Graph.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Graph = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/transactions/history', {
        headers: { Authorization: token },
      });
      const chartData = res.data.map(tx => ({
        name: new Date(tx.date).toLocaleDateString(),
        amount: tx.amount
      }));
      setData(chartData);
    };
    fetchData();
  }, [token]);

  return (
    <div style={{ margin: '2rem', height: '400px' }}>
      <h2>Transaction Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
