const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

///

exports.getPerformer = async (req, res) => {
  try {
    const { performer } = req.params;
    // console.log(req.params);

    const con = await Concert.find({ performer: performer });
    // console.log(con);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const { genre } = req.params;

    const con = await Concert.find( {genre: genre} );
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPriceRange = async (req, res) => {
  try {
    const { price_min, price_max } = req.params;
    const con = await Concert.find({ price: { $gte: price_min, $lte: price_max } });
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => {
  try {
    const { day } = req.params;
    const con = await Concert.find({ day: day });
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

  
///

exports.postNew = async (req, res) => {
  try {
    const { day, genre, image, performer, price } = req.body;
    const newConcert = new Concert({ day: day, genre: genre, image: image, performer: performer, price: price });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { day, genre, image, performer, price } = req.body;
  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { day: day, genre: genre, image: image, performer: performer, price: price }});
      res.send(`changed ${con}`);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.send(`deleted ${con}`);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
