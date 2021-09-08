const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');


router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getId);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/day/:day', ConcertController.getDay);
router.get('/concerts/:price_min/:price_max', ConcertController.getPriceRange);

router.post('/concerts', ConcertController.postNew);
router.put('/concerts/:id', ConcertController.putId);
router.delete('/concerts/:id', ConcertController.deleteId);

module.exports = router;