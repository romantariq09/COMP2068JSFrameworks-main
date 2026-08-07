const express = require("express");
const router = express.Router();

const Book = require("../models/book");

// Display all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    res.render("books/index", {
      title: "Books",
      books: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading books");
  }
});

// Show Add Book form
router.get("/add", (req, res) => {
  res.render("books/add", {
    title: "Add Book",
  });
});

// Add new book
router.post("/add", async (req, res) => {
  try {
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationYear: req.body.publicationYear,
      isbn: req.body.isbn,
      description: req.body.description,
      availability: req.body.availability,
      image: req.body.image,
    });

    res.redirect("/books");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding book");
  }
});

module.exports = router;