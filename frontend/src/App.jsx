import { useEffect, useState } from 'react';
import { getHello } from './lib/api.js';

const API_URL = "https://merntest-xe7c.onrender.com"; // 👈 change

export default function App() {
  const [message, setMessage] = useState('');
  const [dataList, setDataList] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/hello`);
      const data = await res.json();

      setMessage(data.message || "Connected ✅");
      setDataList(data.data || []);
    } catch (e) {
      setError(e?.message || 'Fetch error');
    }
  };

  useEffect(() => {
    fetchData().finally(() => setLoading(false));
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !value) {
      alert("Fill all fields");
      return;
    }

    try {
      await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, value: Number(value) })
      });

      setName('');
      setValue('');

      fetchData(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>MERN Deployment Practice 🚀</h1>

      {loading && <p>Loading…</p>}
      {!loading && error && <p className="error">Error: {error}</p>}
      {!loading && !error && <p className="success">{message}</p>}

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <hr />

      {/* LIST */}
      <h2>Data List</h2>

      {dataList.length === 0 ? (
        <p>No data found</p>
      ) : (
        <ul>
          {dataList.map((item) => (
            <li key={item._id}>
              {item.name} - {item.value}
            </li>
          ))}
        </ul>
      )}

      <p className="hint">
        This page calls <code>/api/hello</code>.
      </p>
    </div>
  );
}