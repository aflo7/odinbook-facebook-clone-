var { Post } = require("../models/schema")

exports.display_post = (req, res) => {
  Post.findById(req.params.id)
    .populate("comments")
    .exec((err, foundPost) => {
      if (err) return res.redirect("error")
      return res.render("post", { foundPost })
    })
}

exports.create_post = (req, res) => {
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
}

exports.like_post = (req, res) => {
  Post.findById(req.body.postID, (err, foundPost) => {
    if (err) return res.render("error")
    foundPost.likes += 1
    foundPost.save((err, result) => {
      if (err) return res.render("error")

      res.redirect("/home")
    })
  })
}

exports.delete_post = (req, res) => {
  Post.findByIdAndDelete(req.body.postID, (err, result) => {
    if (err) {
      return res.render("error")
    }

    res.redirect("/profile")
  })
}
