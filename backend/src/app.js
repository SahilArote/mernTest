import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import Data from './models/dataModel.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

// Routes

// Test route
app.get('/api/hello', async (req, res) => {
  try {
    const data = await Data.find();

    res.json({
      message: `Hello from backend 🚀  this is ${data.length > 0 ? data[0].name : 'No data'}`,
      data: data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create data
app.post('/api/data', async (req, res) => {
  try {
    const data = await Data.create({
      name: "Sahil",
      value: 100
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Start server
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Server Error:", error);
    process.exit(1);
  }
};

startServer();