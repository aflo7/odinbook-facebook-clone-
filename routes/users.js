var express = require("express")
var router = express.Router()
var {
  isAuthenticated,
  getUsersNotFollowing
} = require("../scripts/customMiddleware.js")
var { User } = require("../models/schema.js")

router.post("/follow", isAuthenticated, (req, res) => {
  User.findById(req.user._id, (err, foundUser) => {
    if (err) return res.render("error")

    foundUser.following.push(req.body.userIdToFollow)
    foundUser.save(function (err, result) {
      if (err) {
        return res.render('error')
      } else {
        return res.redirect('/users/find-friends')
      }
    })
  })
})

router.post("/toggle-dark-mode", isAuthenticated, (req, res) => {
  const userId = req.user._id
  User.findById(userId, (err, foundUser) => {
    if (err) return res.render("error")

    foundUser.settings.darkMode = !foundUser.settings.darkMode
    foundUser.save((err, result) => {
      if (err) return res.render("error")

      return res.redirect("/profile")
    })
  })
})

router.get(
  "/find-friends",
  isAuthenticated,
  getUsersNotFollowing,
  (req, res, next) => {
    // get a list of users currently following
    User.findById(req.user._id)
      .populate("following")
      .exec((err, foundUser) => {
        if (err) return res.redirect("/")

        if (!foundUser.following || foundUser.following.length === 0) {
          res.locals.currentFriendNames = []
          return res.render("find-friends")
        }

        const namesOfPeopleYouAreFollowing = foundUser.following.map(
          (person) => person.name
        )
        res.locals.currentFriendNames = namesOfPeopleYouAreFollowing
        return res.render("find-friends")
      })
  }
)

module.exports = router
