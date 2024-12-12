const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

router.post('/rateTrip', passengerController.rateTrip);
router.post('/orderPrivateTrip', passengerController.orderPrivateTrip);
router.post('/requestTrip',passengerController.requestTrip);
router.get('/getMyTrips',passengerController.getMyTrips);
router.post('/setFavouriteTrip',passengerController.setFavouriteTrip);

module.exports = router;
