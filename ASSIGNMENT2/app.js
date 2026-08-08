const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bookRoutes = require("./routes/books");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const GitHubStrategy = require("passport-github2").Strategy;
const app = express();

const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
require("dotenv").config();

// HBS
app.set("view engine", "hbs");

// Public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "booknestsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          githubId: profile.id,
        });

        if (!user) {
          user = await User.create({
            username: `github_${profile.username || profile.id}`,
            githubId: profile.id,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", userRoutes);
app.use("/books", bookRoutes);
// Partials
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.use("/books", bookRoutes);

// Home route
app.get("/", (req, res) => {
  res.render("index", {
    title: "BookNest"
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected to BookNest database");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(PORT, () => {
  console.log(`BookNest running on http://localhost:${PORT}`);
});