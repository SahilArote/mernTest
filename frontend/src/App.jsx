import { useEffect, useState } from 'react';
import { getHello } from './lib/api.js';

export default function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError('');

      try {
        const data = await getHello();
        if (!cancelled) setMessage(data.message);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Something went wrong');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container">
      <h1>MERN Deployment Practice</h1>

      {loading && <p>Loading…</p>}
      {!loading && error && (
        <p className="error">Error: {error}</p>
      )}
      {!loading && !error && (
        <p className="success">{message}</p>
      )}

      <p className="hint">
        This page calls <code>/api/hello</code>.
      </p>
    </div>
  );
}
