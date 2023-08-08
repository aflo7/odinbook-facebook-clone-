// everything here starts with /image
const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../scripts/customMiddleware.js")
const { update_profile_photo } = require("../controllers/imageController.js")
const multer = require("multer")
const fs = require("fs")
const path = require("path")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, "..", "server", "photos/")
    fs.mkdirSync(folderPath, { recursive: true })
    cb(null, folderPath)

  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now())
  }
})

const upload = multer({ storage })

router.post("/", isAuthenticated, upload.single("image"), update_profile_photo)

module.exports = router
