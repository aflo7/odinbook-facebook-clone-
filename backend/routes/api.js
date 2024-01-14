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

  jwt.verify(token, process.env.JWTSECRETKEY, (err, userID) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = userID;
    next();
  });
};

router.get('/verify-token', authenticateToken, (req, res) => {
return res.sendStatus(200)
})

router.get('/home', (req, res) => {
  const token = req.header('Authorization');
  var currentUserId = jwt.verify(token, process.env.JWTSECRETKEY);

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
        return res.json({ posts: result, appleArticles, chatGptArticles });
      });
  });
});

router.post('/login', (req, res) => {
  
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      return res.status(400).json({ message: 'error' });
    }

    if (foundUser) {
      if (req.body.password == foundUser.password) {
        const foundUserId = foundUser._id.toJSON();
        const token = jwt.sign(foundUserId, process.env.JWTSECRETKEY);
        return res.json({ token, user: foundUser.name });
      }
      return res.status(400).json({ message: 'Incorrect password' });
    }

    return res.status(400).json({ message: 'Incorrect username' });
  });
});

router.get('/protected-resource', authenticateToken, (req, res) => {
  return res.json({ message: 'here is the protected resources' });
});

router.post('/create-post', authenticateToken, (req, res) => {
  var currentUserId = jwt.verify(req.body.token, process.env.JWTSECRETKEY);

  User.findById(currentUserId, (err, result) => {
    if (err) return res.sendStatus(400);

    const newPost = new Post({
      posterId: result._id,
      posterName: result.name,
      title: req.body.title ? req.body.title : '',
      content: req.body.content ? req.body.content : '',
      date: new Date(),
      comments: [],
      likes: 0,
      imageUrl: req.body.imageUrl ? req.body.imageUrl : ''
    });
    newPost.save((err, result) => {
      if (err) return res.sendStatus(400);
      return res.json(result);
    });
  });
});

module.exports = router;
