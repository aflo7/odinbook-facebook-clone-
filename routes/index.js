var express = require("express")
var router = express.Router()
var { isAuthenticated } = require("../scripts/customMiddleware.js")
var passport = require("passport")
// var { appleArticles, chatGptArticles } = require("../server/newsData.js")
const {
    load_profile_page,
    load_home_page,
    log_out,
    register_user
} = require("../controllers/indexController.js")
require("dotenv").config()


router.get("/profile", isAuthenticated, load_profile_page)

router.get("/home", isAuthenticated, load_home_page)

router.post("/log-in", (req, res) => {
    if (req.body.guest === "true") {
        req.body.username = process.env.GUEST_USERNAME
        req.body.password = process.env.GUEST_PASSWORD
    }

    res.locals.registeredMsg = ""
    passport.authenticate("local", (err, user, options) => {
        if (err) return res.status(400).render("error")
        if (user) {
            // If the user exists log them in:
            req.login(user, (error) => {
                if (error) {
                    return res.status(400).render("error")
                } else {
                    res.locals.loginErrorMessage = ""
                    return res.redirect("/home")
                }
            })
        } else {
            res.locals.loginErrorMessage = options.message
            return res.status(401).render("index")
        }
    })(req, res)
})

router.get("/log-out", isAuthenticated, log_out)

router.post("/register", register_user)

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/", function (req, res) {
    // if session exists, go home
    if (res.locals.currentUser) {
        return res.redirect("/home")
    }
    res.render("index")
})

module.exports = router
