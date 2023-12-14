var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
const MemoryStore = require('memorystore')(session);
var bodyParser = require('body-parser');
var { User } = require('./models/schema.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook');
require('dotenv').config();
require('./server/mongoConfig.js');
var apiRouter = require('./routes/api.js');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var authRouter = require('./routes/auth');
var imageRouter = require('./routes/image');
var commentRouter = require('./routes/comment.js');

var app = express();

//localhost:5173/

http: var corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:4000'],
  optionsSuccessStatus: 200 // For legacy browser support
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

// app.use(
//     session({
//         cookie: { maxAge: 86400000 },
//         store: new MemoryStore({
//             checkPeriod: 86400000
//         }),
//         resave: false,
//         secret: process.env.SESSION_SECRET,
//         saveUninitialized: true
//     })
// )
// app.use(bodyParser.json())
// app.use(function (req, res, next) {
//     if (!req.user)
//         res.header(
//             "Cache-Control",
//             "private, no-cache, no-store, must-revalidate"
//         )
//     next()
// })

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.CLIENTID,
//             clientSecret: process.env.CLIENTSECRET,
//             callbackURL:
//                 process.env.NODE_ENV === "dev"
//                     ? process.env.DEV_FACEBOOK_CALLBACK_URL
//                     : process.env.PROD_FACEBOOK_CALLBACK_URL,

//             profileFields: ["id", "displayName", "photos"]
//         },
//         function (accessToken, refreshToken, profile, cb) {
//             User.find({ facebookId: profile.id }, (err, result) => {
//                 if (err) return res.render("error")
//                 const user = result[0]
//                 if (user) {
//                     user.pfpUrl = profile.photos[0].value
//                     user.save((err, result) => {
//                         if (err) return res.render("error")
//                         return cb(null, user)
//                     })
//                 } else {
//                     const facebookUser = new User({
//                         creationDate: new Date(),
//                         username: "",
//                         password: "",
//                         following: [],
//                         settings: { darkMode: false },
//                         name: profile.displayName,
//                         isFacebookUser: true,
//                         facebookId: profile.id,
//                         pfpUrl: profile.photos[0].value
//                     })

//                     facebookUser.save((err, result) => {
//                         if (err) return res.render("error")
//                         return cb(null, result)
//                     })
//                 }

//             })
//         }
//     )
// )

// passport.use(
//     new LocalStrategy((username, password, done) => {
//         User.findOne({ username }, (err, foundUser) => {
//             if (err) {
//                 return res.render("error")
//             }

//             if (foundUser) {
//                 if (password == foundUser.password) {
//                     return done(null, foundUser)
//                 }
//                 return done(null, false, { message: "Incorrect password" })
//             }

//             return done(null, false, { message: "Incorrect username" })
//         })
//     })
// )

// passport.serializeUser((user, done) => {
//     done(null, user._id)
// })

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, foundUser) => {
//         if (err || !foundUser) {
//             return done("error deserializing", false)
//         }
//         return done(null, foundUser)
//     })
// })

// app.use(passport.initialize())
// app.use(passport.session())

// app.use((req, res, next) => {
//     res.locals.currentUser = req.user
//     next()
// })

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/posts', postsRouter);
// app.use('/auth', authRouter);
// app.use('/image', imageRouter);
// app.use('/comment', commentRouter);
app.use('/api', apiRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
