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
  if (req.body.username === 'guest' && req.body.password === 'pass') {
    const data = {
      time: Date(),
      userId: 12
    };

    const token = jwt.sign(data, process.env.JWTSECRETKEY);

    return res.json({ token });
  }
  res.sendStatus(401);
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

router.get('/protected-resource', authenticateToken, (req, res) => {
  res.json({ message: 'here is the protected resources' });
});

module.exports = router;
