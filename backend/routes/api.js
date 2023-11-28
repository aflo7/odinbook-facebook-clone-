var express = require('express');
var router = express.Router();
const { appleArticles, chatGptArticles } = require('../server/newsData');

// everything here starts with /api
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

router.get('/articles', (req, res) => {
  res.json({
    appleArticles,
    chatGptArticles
  });
});

module.exports = router;
