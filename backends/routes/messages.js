const express = require('express');
const router = express.Router();
const messageController = require('./../controllers/messages');
router.post('/create', messageController.createMessage);
router.post('/', messageController.readMessages);
module.exports = router;
