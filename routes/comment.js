const express = require("express")
const { delete_comment, create_comment } = require("../controllers/commentController")
const router = express.Router()
const { isAuthenticated } = require('../scripts/customMiddleware')

router.post("/delete", isAuthenticated, delete_comment)

router.post("/create", isAuthenticated, create_comment)

module.exports = router
