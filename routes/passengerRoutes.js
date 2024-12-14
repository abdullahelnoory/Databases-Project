const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

router.post('/rateTrip', passengerController.rateTrip);
router.post('/orderPrivateTrip', passengerController.orderPrivateTrip);
router.post('/requestTrip',passengerController.requestTrip);
router.post('/getMyTrips',passengerController.getMyTrips);
router.post('/getTrips',passengerController.getTrips);
router.post('/setFavouriteTrip',passengerController.setFavouriteTrip);
router.post('/getStatusPrivateTrips',passengerController.getStatusPrivateTrips);

module.exports = router;
