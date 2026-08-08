# BookNest

BookNest is an online library management application built with Node.js, Express, MongoDB/Mongoose, and Handlebars (HBS).

The application allows visitors to browse and search the library collection. Registered users can securely log in and manage books by adding, editing, and deleting book records.

## Features

- Browse the complete book collection
- Add new books
- Edit existing books
- Delete books with confirmation
- User registration
- User login and logout
- GitHub OAuth login
- Public read-only book collection
- Protected book management routes
- Search books by title or author
- Responsive Bootstrap interface
- MongoDB Atlas database

## Additional Feature

The additional feature implemented in BookNest is a book search system.

Users can search the public book collection by entering a book title or author name. The application performs a case-insensitive MongoDB search and displays matching books.

This makes it easier for users to quickly find books in a larger library collection.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Handlebars (HBS)
- Passport.js
- passport-local-mongoose
- GitHub OAuth
- express-session
- method-override
- Bootstrap
- Custom CSS

## Authentication

BookNest supports two authentication methods:

1. Local account registration and login
2. GitHub OAuth login

Visitors can browse and search books without logging in.

Only authenticated users can:

- Add books
- Edit books
- Delete books

## CRUD Functionality

- Create - Add a new book
- Read - Browse the book collection
- Update - Edit book information
- Delete - Remove a book with confirmation

## Live Website

The deployed BookNest application will be available here:

Live Site: https://booknest-5jt9.onrender.com

## GitHub Repository

BookNest is located inside the ASSIGNMENT2 folder of the class repository.