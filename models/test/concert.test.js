const Concert = require('../concert.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert model', () => {

  it('should throw an error if no "name" arg', () => {
    
   
  });

  after(() => {
    mongoose.models = {};
  });

});