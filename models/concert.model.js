
const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  genre: { type: String, required: true },
  image: { type: String, required: true},
  performer: { type: String, required: true},
  price: { type: Number, required: true},
});

module.exports = mongoose.model('Concert', concertSchema);