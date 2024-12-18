const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);
router.post('/delete-account', authController.deleteAccount);


module.exports = router;
