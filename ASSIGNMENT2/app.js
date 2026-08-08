const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bookRoutes = require("./routes/books");
const methodOverride = require("method-override");
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