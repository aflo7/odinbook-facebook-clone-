var express = require("express")
var router = express.Router()
var { isAuthenticated } = require("../scripts/customMiddleware.js")
var { User } = require("../models/schema.js")
var fs = require("fs")
const path = require("path")
var multer = require("multer")

function clearUploadsFolder() {
  fs.readdir(path.join(__dirname, "..", "uploads/"), (err, files) => {
  // fs.readdir("/Users/andres/Desktop/odin/uploads/", (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(__dirname, "..", "uploads", file), (err) => {
        if (err) throw err
      })
    }
  })
}
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "uploads")
    cb(null, path.join(__dirname, "..", 'uploads/'))
    
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now())
  }
})

var upload = multer({ storage: storage })

// everything here starts with /image
router.post("/", isAuthenticated, upload.single("image"), (req, res, next) => {
  // console.log(__dirname)
  var img = {
    data: fs.readFileSync(
      path.join(__dirname, "..", "uploads", req.file.filename)
    ),
    contentType: "image/png"
  }

  User.findById(req.user._id, function (err, foundUser) {
    if (err) return res.render("error")
    foundUser.nonFacebookUserImg = img
    clearUploadsFolder()
    foundUser.save(function (err, result) {
      if (err) return res.render("error")
      res.redirect("/profile")
    })
  })
})

module.exports = router
