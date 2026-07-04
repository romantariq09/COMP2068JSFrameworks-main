require('dotenv').config();

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

let session = require('express-session');
let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;
let User = require('./models/User');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let tasksRouter = require('./routes/tasks');

let app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected to TaskFlow database');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        }

        let username = profile.username || `github_${profile.id}`;

        let existingUsername = await User.findOne({ username: username });

        if (existingUsername) {
          username = `${username}_${profile.id}`;
        }

        let email = '';

        if (profile.emails && profile.emails.length > 0) {
          email = profile.emails[0].value;
        }

        user = new User({
          username: username,
          email: email,
          githubId: profile.id
        });

        await user.save();

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;