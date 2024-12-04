const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/verify',adminController.verify);
router.post('/addStation',adminController.addStation);
router.post('/removeStation',adminController.removeStation);

module.exports = router;