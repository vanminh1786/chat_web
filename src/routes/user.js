const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/', userController.getUsers);
router.post('/addFriends', userController.addFriends);

module.exports = router;
