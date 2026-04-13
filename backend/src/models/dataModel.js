const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const Data = mongoose.model('Data', DataSchema);
module.exports = Data;