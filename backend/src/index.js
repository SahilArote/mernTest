import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
