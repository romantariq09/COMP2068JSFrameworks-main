const express = require("express");
const passport = require("passport");

const User = require("../models/user");

const router = express.Router();

// Register page
router.get("/register", (req, res) => {
  res.render("users/register", {
    title: "Register",
  });
});

// Register user
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
    });

    const registeredUser = await User.register(
      user,
      req.body.password
    );

    req.login(registeredUser, (error) => {
      if (error) {
        console.log(error);
        return res.redirect("/register");
      }

      res.redirect("/books");
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
});

// Login page
router.get("/login", (req, res) => {
  res.render("users/login", {
    title: "Login",
  });
});

// Login user
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/books");
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
});

// Login with GitHub
router.get(
  "/auth/github",
  passport.authenticate("github")
);

// GitHub callback
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/books");
  }
);

module.exports = router;