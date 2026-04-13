import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
}, { timestamps: true });

const Data = mongoose.model('Data', DataSchema);

export default Data;