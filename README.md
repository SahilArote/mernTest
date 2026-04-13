# Simple MERN Deployment Practice (No DB)

This repo contains a minimal MERN-style setup:
- **backend/**: Node.js + Express API
- **frontend/**: React (Vite)

The frontend fetches `GET /api/hello` and displays the message.

## Project Structure

- backend/
  - src/index.js
  - package.json
  - .env.example
- frontend/
  - src/App.jsx
  - src/lib/api.js
  - vite.config.js
  - package.json
  - .env.example
- package.json (root helper scripts)

## Local Setup

### 1) Install dependencies

Option A (recommended): install both at once from repo root:

```bash
npm run install:all
```

Option B:

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2) Configure environment variables

Backend:
- Copy `backend/.env.example` to `backend/.env`

Frontend (optional):
- Copy `frontend/.env.example` to `frontend/.env`
- For local dev you can leave `VITE_API_URL` empty and use the Vite proxy.

### 3) Run both apps

From repo root:

```bash
npm run dev
```

- Backend runs on `http://localhost:5000` (or `PORT`)
- Frontend runs on the Vite dev server (usually `http://localhost:5173`)

## How the API URL works

- **Local dev:** the frontend calls `/api/hello` (relative). Vite proxies `/api` to the backend via `frontend/vite.config.js`.
- **Production:** set `VITE_API_URL` (e.g. `https://your-backend.onrender.com`). The frontend will call `https://.../api/hello`.

## Deploy (simple approach)

### Backend on Render

1. Create a new **Web Service** from the `backend/` folder.
2. Build Command:
   - `npm install`
3. Start Command:
   - `npm start`
4. Environment Variables:
   - `PORT` is provided by Render automatically (no need to set it).

After deploy, note your backend URL, for example:
- `https://my-backend.onrender.com`

Test it:
- `https://my-backend.onrender.com/api/hello`

### Frontend on Vercel

1. Import the repo to Vercel.
2. Set **Root Directory** to `frontend/`.
3. Framework preset: **Vite**.
4. Add Environment Variable:
   - `VITE_API_URL` = your Render backend URL (example: `https://my-backend.onrender.com`)
5. Deploy.

## Notes

- No database is used.
- CORS is enabled in the backend (`cors()`), which is fine for practice.
