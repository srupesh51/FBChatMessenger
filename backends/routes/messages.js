const express = require('express');
const router = express.Router();
const messageController = require('./../controllers/messages');
const checkAuth = require('./../middleware/check-auth');
router.post('/create', checkAuth, messageController.createMessage);
router.get('/:id', checkAuth, messageController.readMessages);
module.exports = router;
