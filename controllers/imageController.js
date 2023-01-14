var fs = require("fs")
const path = require("path")
const { clearUploadsFolder } = require("../scripts/clearUploadsFolder")
const { User } = require("../models/schema")

exports.upload_image = (req, res, next) => {
  var img = {
    data: fs.readFileSync(
      path.join(__dirname, "..", "routes", "photos", req.file.filename)
    ),
    contentType: "image/png"
  }

  User.findById(req.user._id, function (err, foundUser) {
    if (err) return res.render("error")
    foundUser.nonFacebookUserImg = img
    try {
      clearUploadsFolder()
    } catch (error) {
      return res.status(500).render("error")
    }
    foundUser.save(function (err, result) {
      if (err) return res.render("error")
      res.redirect("/profile")
    })
  })
}
