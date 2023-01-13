var { User, Post, Comment } = require("../models/schema")

function isAuthenticated(req, res, next) {
  if (req.user) return next()
  else return res.status(403).redirect("/")
}

function getUsersNotFollowing(req, res, next) {
  const currentUserId = req.user._id
  // retrieve all users except the current user
  User.find(
    { _id: { $ne: currentUserId } },
    "name _id",
    function (err, allUsers) {
      if (err) {
        return res.sendStatus(400)
      }
      const usersFollowing = req.user.following
      const usersNotFollowing = allUsers.filter(
        (user) => !usersFollowing.includes(user._id)
      )
      res.locals.allUsers = usersNotFollowing
      next()
    }
  )
}

module.exports = { getUsersNotFollowing, isAuthenticated }
