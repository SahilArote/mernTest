function getApiBaseUrl() {
  // In production, set VITE_API_URL (e.g. https://your-backend.onrender.com)
  // In local dev, leave it empty and Vite will proxy /api -> backend.
  return import.meta.env.VITE_API_URL || '';
}

export async function getHello() {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/hello`);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed (${res.status})`);
  }

  return res.json();
}
