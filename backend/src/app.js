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
      message: `Hello from backend 🚀}`,
      data: data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const { name, value } = req.body;

    const data = await Data.create({
      name,
      value
    });

    res.status(201).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Data.findOneAndDelete({ _id: id });

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, value } = req.body;
    const data = await Data.findOneAndUpdate({ _id: id }, { name, value }, { new: true });

    res.status(200).json(data);
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