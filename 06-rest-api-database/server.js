const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

// READ all
app.get("/books", (req, res) => {
  res.json(db.getAllBooks());
});

// READ one
app.get("/books/:id", (req, res) => {
  const book = db.getBookById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// CREATE
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  const book = db.createBook({ title, author, year });
  res.status(201).json(book);
});

// UPDATE
app.put("/books/:id", (req, res) => {
  const existing = db.getBookById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Book not found" });
  const updated = db.updateBook(req.params.id, { ...existing, ...req.body });
  res.json(updated);
});

// DELETE
app.delete("/books/:id", (req, res) => {
  const existing = db.getBookById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Book not found" });
  db.deleteBook(req.params.id);
  res.status(204).end();
});

const PORT = 3002;
app.listen(PORT, () => console.log(`REST API running at http://localhost:${PORT}`));
