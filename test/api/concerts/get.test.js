const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');


const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', day: '1', genre: 'pop', image: 'imgpath', performer: 'John', price: '25' });
    await testConOne.save();
  
    const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', day: '1', genre: 'rock', image: 'imgpath', performer: 'Haley', price: '40' });
    await testConTwo.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/ should return one performer by performer name ', async () => {
    const res = await request(server).get('/api/concerts/performer/John');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/ should return one genre by genre name ', async () => {
    const res = await request(server).get('/api/concerts/genre/pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/ should return all concerts on a given day ', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

  it('/ should return all concerts on a given price range ', async () => {
    const res = await request(server).get('/api/concerts/20/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

});  