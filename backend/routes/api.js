var express = require('express');
var router = express.Router();
const { appleArticles, chatGptArticles } = require('../server/newsData');
var jwt = require('jsonwebtoken');
var { User, Post } = require('../models/schema.js');

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

router.post('/home', (req, res) => {
  var currentUserId = jwt.verify(req.body.token, process.env.JWTSECRETKEY);
  User.findById(currentUserId, (err, result) => {
    if (err) return res.render('error');
    const userIdsToFind = result.following;
    userIdsToFind.push(result._id);

    Post.find({
      posterId: {
        $in: userIdsToFind
      }
    })
      .sort({ _id: -1 })
      .exec((err, result) => {
        if (err) return res.json({ message: 'error' });
        return res.json({ posts: result });
      });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      return res.json({ message: 'error' });
    }

    if (foundUser) {
      if (req.body.password == foundUser.password) {
        const foundUserId = foundUser._id.toJSON();
        const token = jwt.sign(foundUserId, process.env.JWTSECRETKEY);
        return res.json({ token });
      }
      return res.json({ message: 'Incorrect password' });
    }

    return res.json({ message: 'Incorrect username' });
  });
});

router.get('/protected-resource', authenticateToken, (req, res) => {
  return res.json({ message: 'here is the protected resources' });
});

module.exports = router;
