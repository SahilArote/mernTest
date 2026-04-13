import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

export default mongoose.model('Data', DataSchema);