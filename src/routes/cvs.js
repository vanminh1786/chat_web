const express = require('express');
const router = express.Router();
const controller = require('../controllers/ConversationController');

router.post('/', controller.getCvs);
router.post('/update', controller.updateCvs);

module.exports = router;
