const express = require('express');
const router = express.Router();
const controller = require('../controllers/LoginController');

router.post('/', controller.login);

module.exports = router;
