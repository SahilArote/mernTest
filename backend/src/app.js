import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongodb from 'mongodb';
import mongoose from 'mongoos';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const Data = require('./models/dataModel');


app.get('/api/hello', (req, res) => {
  const data = new Data({ name: "Sahil", value: 100 });
  res.json({ message: `Hello from the backend! Data: ${data.name} - ${data.value}` });
});

app.post('/api/data', async (req, res) => {
  const data = await Data.create({ name: "Sahil", value: 100 });
  res.redirect('/api/hello/' + data._id);
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
