var express = require('express');
var router = express.Router();
var { isAuthenticated } = require('../scripts/customMiddleware.js');
const {
  display_post,
  create_post,
  like_post,
  delete_post
} = require('../controllers/postController.js');

router.get('/:id', isAuthenticated, display_post);

router.post('/new', isAuthenticated, create_post);

router.post('/like', isAuthenticated, like_post);

router.post('/delete', isAuthenticated, delete_post);

module.exports = router;
