const express = require('express');
const router = express.Router();
const checkAuth = require('./../middleware/check-auth');
const userController = require('./../controllers/users');
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/', checkAuth, userController.getUser);
module.exports = router;
