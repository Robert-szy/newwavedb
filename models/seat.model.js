
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  client: { type: String, required: true },
  day: { type: Number, required: true },
  email: { type: String, required: true },
  seat: { type: Number, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);