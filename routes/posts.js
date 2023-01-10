var express = require("express")
var router = express.Router()
var { isAuthenticated } = require("../scripts/customMiddleware.js")
var { Post, Comment } = require("../models/schema.js")

router.get("/:id", isAuthenticated, (req, res) => {
  Post.findById(req.params.id)
    .populate("comments")
    .exec((err, foundPost) => {
      if (err) return res.redirect("error")
      return res.render("post", { foundPost })
    })
})

router.post("/new", isAuthenticated, (req, res) => {
  const newPost = new Post({
    posterId: req.user._id,
    posterName: req.user.name,
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
    comments: [],
    likes: 0
  })
  newPost.save((err, result) => {
    if (err) return res.render("error")
    return res.redirect("/home")
  })
})

router.post("/like", isAuthenticated, (req, res) => {
  Post.findById(req.body.postID, (err, foundPost) => {
    if (err) return res.render("error")
    foundPost.likes += 1
    foundPost.save((err, result) => {
      if (err) return res.render("error")

      res.redirect("/home")
    })
  })
})

router.post("/new-comment", isAuthenticated, (req, res) => {
  const newComment = new Comment({
    content: req.body.content,
    author: req.body.author
  })

  Post.findById(req.body.postID, (err, foundPost) => {
    if (err) return res.render("error")

    newComment.save((err, result) => {
      if (err) return res.render("error")
      foundPost.comments.push(result._id)
      foundPost.save((err, result) => {
        if (err) return res.render("error")
        res.redirect(`/posts/${req.body.postID}`)
      })
    })
  })
})

module.exports = router
