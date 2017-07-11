var express = require('express');
var posts = require('./controllers/posts.ctrl');
var users = require('./controllers/users.ctrl');
var categories = require('./controllers/categories.ctrl');

var router = express.Router();

router.use('/posts', posts); // posts after comma is variable posts from line 2
router.use('/users', users);
router.use('/categories', categories);

module.exports = router;