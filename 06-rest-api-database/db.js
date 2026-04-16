const Database = require("better-sqlite3");
const db = new Database("app.db");

// Runs once at startup - safe to re-run (IF NOT EXISTS)
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER
  )
`);

// CRITICAL SECURITY NOTE: always use parameterized queries (the ? placeholders).
// NEVER do `db.prepare(\`SELECT * FROM books WHERE title = '${input}'\`)` -
// that's a direct SQL injection vulnerability.

function getAllBooks() {
  return db.prepare("SELECT * FROM books").all();
}

function getBookById(id) {
  return db.prepare("SELECT * FROM books WHERE id = ?").get(id);
}

function createBook({ title, author, year }) {
  const result = db
    .prepare("INSERT INTO books (title, author, year) VALUES (?, ?, ?)")
    .run(title, author, year);
  return getBookById(result.lastInsertRowid);
}

function updateBook(id, { title, author, year }) {
  db.prepare("UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?").run(
    title, author, year, id
  );
  return getBookById(id);
}

function deleteBook(id) {
  db.prepare("DELETE FROM books WHERE id = ?").run(id);
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
