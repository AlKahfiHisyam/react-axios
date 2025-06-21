import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Ambil data dari API (GET)
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/posts');
      setPosts(res.data.slice(0, 10)); // Batasi 10 data
      setError('');
    } catch (err) {
      setError('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Kirim data baru ke API (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/posts', {
        title,
        body,
        userId: 1
      });
      setPosts([res.data, ...posts]); // Tambahkan data baru ke atas
      setTitle('');
      setBody('');
      setError('');
    } catch (err) {
      setError('Gagal mengirim data');
    }
  };

  // Hapus data (DELETE) - hanya lokal (API dummy)
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      setError('');
    } catch (err) {
      setError('Gagal menghapus data');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>React + Axios: CRUD Sederhana</h1>

      {/* Form Tambah Post */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h2>Buat Post Baru</h2>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
        />
        <br />
        <textarea
          placeholder="Isi"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ padding: '8px', width: '300px', height: '100px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit">Kirim</button>
      </form>

      {/* Tampilkan Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Loading */}
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} style={{ marginBottom: '10px' }}>
              <strong>{post.title}</strong>
              <br />
              {post.body}
              <br />
              <button onClick={() => handleDelete(post.id)} style={{ marginTop: '5px' }}>
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
