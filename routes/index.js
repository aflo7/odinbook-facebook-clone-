var express = require("express")
var router = express.Router()
var {
  isAuthenticated
} = require("../scripts/customMiddleware.js")
var { User, Post } = require("../models/schema.js")
var passport = require("passport")
var { appleArticles, chatGptArticles } = require("../server/newsData.js")

router.get("/profile", isAuthenticated, (req, res) => {
  // update the current user session
  req.logIn(req.user, (error) => {
    if (error) {
      return res.render("error")
    }
    return res.render("profile")
  })
})

router.get("/home", isAuthenticated, (req, res) => {
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

router.post("/log-in", (req, res) => {
  res.locals.registeredMsg = ""
  passport.authenticate("local", (err, user, options) => {
    if (err) return res.render("error")
    if (user) {
      // If the user exists log him in:
      req.login(user, (error) => {
        if (error) {
          return res.render("error")
        } else {
          res.locals.loginErrorMessage = ""
          return res.redirect("/home")
        }
      })
    } else {
      res.locals.loginErrorMessage = options.message
      return res.render("index")
    }
  })(req, res)
})

router.get("/log-out", isAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.render("error")
    }
    return res.redirect("/")
  })
})

router.post("/register", (req, res) => {
  const newUser = new User({
    creationDate: new Date(),
    username: req.body.username,
    password: req.body.password,
    following: [],
    settings: { darkMode: false },
    name: req.body.name,
    isFacebookUser: false,
    facebookId: "",
    pfpUrl: ""
  })

  newUser.save(function (err, result) {
    if (err) return res.status(400).render('err')
    res.locals.registeredMsg = "Successfully registered!"
    res.status(200).render("index")
  })
})

router.get("/register", (req, res) => {
  res.render("register")
})

router.get("/", function (req, res) {
  // if session exists, go home
  if (res.locals.currentUser) {
    return res.redirect('/home')
  }
  res.render("index")
})

module.exports = router
