import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });

  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();

const app = express();

app.use(cors());
app.use(express.json());

import Data from './models/dataModel.js';


app.get('/api/hello', async (req, res) => {
   const data = await Data.find();
  res.json({ message: `Hello from the backend! Data: ${data.name} - ${data.value}` });
});

app.post('/api/data', async (req, res) => {
  try {
    const data = await Data.create({ name: "Sahil", value: 100 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
