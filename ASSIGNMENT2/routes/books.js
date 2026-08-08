const express = require("express");
const router = express.Router();

const Book = require("../models/book");

// Check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

// Display all books
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    let query = {};

    if (search) {
      query = {
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            author: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const books = await Book.find(query);

    res.render("books/index", {
      title: "Books",
      books: books,
      search: search,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading books");
  }
});

// Show Add Book form
router.get("/add",isAuthenticated, (req, res) => {
  res.render("books/add", {
    title: "Add Book",
  });
});

// Add new book
router.post("/add", isAuthenticated, async (req, res) => {
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

// Show Edit Book form
router.get("/:id/edit", isAuthenticated,async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.render("books/edit", {
      title: "Edit Book",
      book: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading book");
  }
});

// Update Book
router.put("/:id",isAuthenticated, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, {
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
    res.status(500).send("Error updating book");
  }
});

// Delete Book
router.delete("/:id",isAuthenticated, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.redirect("/books");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting book");
  }
});

module.exports = router;