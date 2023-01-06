var express = require("express")
var router = express.Router()
var {
  isAuthenticated,
  getUsersNotFollowing
} = require("../scripts/customMiddleware.js")
var { User, Post, Comment } = require("../models/schema.js")
var passport = require("passport")
var { appleArticles, chatGptArticles } = require("../server/newsData.js")

router.get("/:id", isAuthenticated, (req, res) => {
  const postIdToFind = req.params.id
  Post.findById(postIdToFind, (err, foundPost) => {
    if (err) return res.redirect("error")

    return res.render("post", { foundPost: foundPost })
  })
})

router.post("/new", isAuthenticated, (req, res) => {
  const posterId = req.user._id
  const posterName = req.user.name
  const title = req.body.title
  const content = req.body.content
  const date = new Date()
  const comments = []

  const newPost = new Post({
    posterId,
    posterName,
    title,
    content,
    date,
    comments
  })
  newPost.save(function (err, result) {
    if (err) return res.render("error")
    return res.redirect("/home")
  })
})

module.exports = router
