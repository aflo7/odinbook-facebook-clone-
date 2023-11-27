const { CommentModel, Post } = require('../models/schema');

exports.delete_comment = (req, res) => {
  CommentModel.findByIdAndDelete(req.body.commentID, (err, result) => {
    if (err) return res.status(400).render('error');

    res.redirect('/profile');
  });
};

exports.create_comment = (req, res) => {
  const newComment = new CommentModel({
    content: req.body.content,
    author: req.body.author
  });

  Post.findById(req.body.postID, (err, foundPost) => {
    if (err) return res.render('error');

    newComment.save((err, result) => {
      if (err) return res.render('error');
      foundPost.comments.push(result._id);
      foundPost.save((err, result) => {
        if (err) return res.render('error');
        res.redirect(`/posts/${req.body.postID}`);
      });
    });
  });
};
