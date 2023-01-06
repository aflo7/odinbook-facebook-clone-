var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var mongoose = require("mongoose")
var path = require("path")
var session = require("express-session")
var bodyParser = require("body-parser")
var { User, Post, Comment } = require("./models/schema.js")
var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy
var flash = require('express-flash')

require("dotenv").config()

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var postsRouter = require("./routes/posts")

mongoose.set("strictQuery", false)
// Set up default mongoose connection
const mongoDB = process.env.MONGO_URI
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(bodyParser.json())
app.use(flash());
app.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, function (err, foundUser) {
      if (err) {
        console.log(err)
        return res.redirect("/")
      }

      if (foundUser) {
        if (password == foundUser.password) {
          return done(null, foundUser)
        }
        return done(null, false, { message: "Incorrect password" })
      }

      return done(null, false, { message: "Incorrect username" })
    })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, foundUser) {
    if (err) {
      return done("error deserializing", false)
    }
    if (foundUser) {
      return done(null, foundUser)
    } else {
      return done("error deserializing", false)
    }
  })
})

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/posts", postsRouter)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
