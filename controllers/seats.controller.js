const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Seat.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { client, day, email, seat } = req.body;
    const newProduct = new Seat({ client: client, day: day, email: email, seat: seat });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { client, day, email, seat } = req.body;
  try {
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { client: client, day: day, email: email, seat: seat }});
      res.send(`changed ${sea}`);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  try {
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.send(`deleted ${sea}`);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
