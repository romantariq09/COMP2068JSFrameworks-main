const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },

  publicationYear: {
    type: Number,
  },

  isbn: {
    type: String,
  },

  description: {
    type: String,
  },

  availability: {
    type: String,
    default: "Available",
  },

  image: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book; 