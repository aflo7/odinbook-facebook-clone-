var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
mongoose.set("strictQuery", false)
var path = require("path")
var session = require("express-session")
const MemoryStore = require("memorystore")(session)
var bodyParser = require("body-parser")
var { User } = require("./models/schema.js")
var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy
var FacebookStrategy = require("passport-facebook")
var request = require("supertest")
const { faker } = require("@faker-js/faker")

require("dotenv").config()

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users.js")
var postsRouter = require("./routes/posts.js")
var authRouter = require("./routes/auth.js")
var imageRouter = require("./routes/image.js")

var app = express()
// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true
  })
)
app.use(bodyParser.json())
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
  next()
})

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL:
        process.env.NODE_ENV === "dev"
          ? "http://localhost:4000/auth/facebook/callback"
          : "https://app4.memberssonly.xyz/auth/facebook/callback",

      profileFields: ["id", "displayName", "photos"]
    },
    function (accessToken, refreshToken, profile, cb) {
      // see if the user exists in the database...
      User.find({ facebookId: profile.id }, function (err, foundUser) {
        if (err) return res.render("error")
        if (foundUser.length !== 0) return cb(null, foundUser[0])

        // at this point, we determined that the user doesnt exist, proceed to create a new User.
        const newFacebookUser = new User({
          creationDate: new Date(),
          username: "",
          password: "",
          following: [],
          settings: { darkMode: false },
          name: profile.displayName,
          isFacebookUser: true,
          facebookId: profile.id,
          pfpUrl: profile.photos[0].value
        })

        newFacebookUser.save(function (err, newlyCreatedUser) {
          if (err) return res.render("error")
          return cb(null, newlyCreatedUser)
        })
      })
    }
  )
)

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, function (err, foundUser) {
      if (err) {
        console.log(err)
        return res.render("error")
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
app.use("/auth", authRouter)
app.use("/image", imageRouter)

let mongo = null
const connectDB = async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongo.stop()
  }
}

const dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
      await collection.drop()
    }
  }
}

describe("login, register test suite", function () {
  this.db = null
  this.mongoServer = null

  beforeAll(async () => {
    await connectDB()
  })
  afterAll(async () => {
    await dropDB()
  })
  afterEach(async () => {
    await dropCollections()
  })

  test("register", (done) => {
    request(app)
      .post("/register")
      .type("form")
      .send({
        username: "sam",
        password: "pass",
        name: "Sam M"
      })
      .expect(200)
      .end(done)
  })

  test("register", (done) => {
    request(app)
      .post("/register")
      .type("form")
      .send({
        username: faker.internet.userName(),
        password: "pass",
        name: faker.name.fullName()
      })
      .expect(200)
      .end(done)
  })

  test("register, then login the same user", (done) => {
    const username = faker.internet.userName()
    const name = faker.name.fullName()
    request(app)
      .post("/register")
      .type("form")
      .send({
        username: username,
        password: "pass",
        name: name
      })
      .expect(200)
      .end(() => {
        request(app)
          .post("/log-in")
          .type("form")
          .send({ username: username, password: "pass" })
          .expect(302)
          .expect("Location", "/home")
          .end(done)
      })
  })

  test("register a user, then try logging in with the wrong password", (done) => {
    const username = faker.internet.userName()
    const name = faker.name.fullName()
    request(app)
      .post("/register")
      .type("form")
      .send({
        username: username,
        password: "pass",
        name: name
      })
      .expect(200)
      .end(() => {
        request(app)
          .post("/log-in")
          .type("form")
          .send({ username: username, password: "wrongpassword" })
          .expect(401)
          .end(done)
      })
  })

  test("login with a user that does not exist", (done) => {
    request(app)
      .post("/log-in")
      .type("form")
      .send({ username: "jdjfnjnfjejeeiem", password: "ejcmjedjemjkemdjmed" })
      .expect(401) // unauthorized
      .end(done)
  })

  test("login, then navigate to profile page", (done) => {
    request(app)
      .post("/log-in")
      .type("form")
      .send({ username: "caleb", password: "pass" })
      .expect(200)
      // .end(done)
      .end(() => {
        request(app).get("/profile").expect(302).end(done)
      })
  })
})

async function checkUserPhoto(username) {
  const res = await User.find({ username: username })
  console.log(res)
}

describe("upload profile photo", function () {
  this.db = null
  this.mongoServer = null
  this.username = faker.internet.userName()
  this.password = "pass"
  this.name = faker.name.fullName()

  beforeAll(async () => {
    await connectDB()
  })
  afterAll(async () => {
    await dropCollections()
    await dropDB()
  })

  test("register, login, upload photo", (done) => {
    request(app)
      .post("/register")
      .type("form")
      .send({
        username: this.username,
        password: this.password,
        name: this.name
      })
      .expect(200)
      .end(() => {
        request(app)
          .post("/log-in")
          .type("form")
          .send({ username: this.username, password: this.password })
          .expect(401)
          .end(() => {
            request(app)
              .post("/image")
              .attach("file", "./testing/download.jpeg")
              .expect(302)
              .end(done)
          })
      })
  })
})
