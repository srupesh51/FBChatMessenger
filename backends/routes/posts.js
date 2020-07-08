const express = require('express');
const router = express.Router();
const postController = require('./../controllers/posts');
const checkAuth = require('./../middleware/check-auth');
router.post('/create', checkAuth, postController.createPost);
router.get('/', checkAuth, postController.readPosts);
module.exports = router;
