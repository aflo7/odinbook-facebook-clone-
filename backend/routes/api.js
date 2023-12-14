var express = require('express');
var router = express.Router();
const { appleArticles, chatGptArticles } = require('../server/newsData');
var jwt = require('jsonwebtoken');
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

router.post('/login', (req, res) => {
  console.log(req.body);
  const jwtSecretKey = 'theSecret';

  const data = {
    time: Date(),
    userId: 12
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.json({ token });
});

module.exports = router;
