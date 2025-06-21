import React, { useEffect, useState } from 'react';
import api from './api';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/posts') // Token akan otomatis disisipkan
      .then((res) => setData(res.data))
      .catch((err) => console.error('Gagal ambil data:', err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title || item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
