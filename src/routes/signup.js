const express = require('express');
const router = express.Router();
const controller = require('../controllers/SignupController');

router.post('/', controller.checkPhone);

module.exports = router;
