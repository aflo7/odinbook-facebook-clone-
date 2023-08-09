const { Post, User } = require("../models/schema")
const { appleArticles, chatGptArticles } = require("../server/newsData")
const shuffle = require("../scripts/shuffle")

exports.load_profile_page = (req, res) => {
    req.logIn(req.user, (error) => {
        if (error) {
            return res.status(400).render("error")
        }

        Post.find({
            posterId: {
                $in: req.user._id
            }
        })
            .populate("comments")
            .exec((err, foundPosts) => {
                if (err) return res.status(400).render("error")
                res.locals.myPosts = foundPosts
                return res.render("profile")
            })
    })
}

exports.load_home_page = (req, res) => {
    const userIdsToFind = req.user.following
    userIdsToFind.push(req.user._id)
    res.locals.newsArticles = shuffle(
        appleArticles.articles.concat(chatGptArticles.articles)
    )

    Post.find({
        posterId: {
            $in: userIdsToFind
        }
    })
        .sort({ _id: -1 }).populate('comments')
        .exec(function (err, docs) {
            if (err) return res.render("error")
            res.locals.posts = docs
            console.log(docs)
            res.render("home")
        })
}

exports.log_out = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(400).render("error")
        }
        return res.redirect("/")
    })
}

exports.register_user = (req, res) => {
    const newUser = new User({
        creationDate: new Date(),
        username: req.body.username,
        password: req.body.password,
        following: [],
        settings: { darkMode: false },
        name: req.body.name,
        isFacebookUser: false,
        facebookId: "",
        pfpUrl: ""
    })

    newUser.save(function (err, result) {
        if (err) return res.status(400).render("err")
        res.locals.registeredMsg = "Successfully registered!"
        res.status(200).render("index")
    })
}
