var express = require("express")
var router = express.Router()
var {
  isAuthenticated,
  getUsersNotFollowing
} = require("../scripts/customMiddleware.js")
var { User, Post, Comment } = require("../models/schema.js")
var passport = require("passport")
var { appleArticles, chatGptArticles } = require("../server/newsData.js")

router.get("/home", isAuthenticated, (req, res, next) => {
  const userIdsToFind = req.user.following
  userIdsToFind.push(req.user._id)

  res.locals.newsArticles = { appleArticles, chatGptArticles }
  Post.find(
    {
      posterId: {
        $in: userIdsToFind
      }
    },
    function (err, docs) {
      if (err) return res.render("error")
      res.locals.posts = docs
      res.render("home")
    }
  )
})

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
)

router.get("/log-out", isAuthenticated, (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})

router.post("/register", (req, res, next) => {
  console.log(req.body)
  const username = req.body.username
  const password = req.body.password
  const name = req.body.name
  const following = []

  const newUser = new User({
    username,
    password,
    name,
    following
  })

  newUser.save(function (err, result) {
    if (err) return res.render("error")
    res.redirect("/")
  })
})

router.get("/register", (req, res, next) => {
  res.render("register")
})

router.get("/", function (req, res, next) {
  res.render("index")
})

module.exports = router
