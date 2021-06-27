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
