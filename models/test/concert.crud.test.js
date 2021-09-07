const Concert = require('../concert.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert', async () => {

  try {
    await mongoose.connect('mongodb://localhost:27017/NewWaveDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
  } catch(err) {
    console.error(err);
  }

  describe('Reading data', () => {

    it('should return all the data with "find" method', () => {
  
    });
  
  });

  after(() => {
    mongoose.models = {};
  });
  
});