const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

router.post('/rateTrip', passengerController.rateTrip);
router.post('/orderPrivateTrip', passengerController.orderPrivateTrip);

module.exports = router;
