// everything here starts with /image
var express = require("express")
var router = express.Router()
var { isAuthenticated } = require("../scripts/customMiddleware.js")
const { upload_image } = require("../controllers/imageController.js")
var multer = require("multer")
var fs = require("fs")

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "uploads")
    const folderPath = __dirname+ '/photos/'
    // create photos folder if it does not exist
    // also necessary because git does not track empty folders
    fs.mkdirSync(folderPath, { recursive: true })
    cb(null, folderPath)
    
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now())
  }
})

var upload = multer({ storage: storage })

router.post("/", isAuthenticated, upload.single("image"), upload_image)

module.exports = router
