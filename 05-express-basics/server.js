const express = require("express");
const app = express();

// MIDDLEWARE: functions that run BEFORE your route handler, in order.
// Each one can inspect/modify req & res, then call next() to continue,
// or end the response itself (skipping everything after it).

// Built-in middleware: parses JSON request bodies into req.body automatically
app.use(express.json());

// Built-in middleware: serves files from /public with zero routing code
// (compare to folder 04, where you'd hand-write this)
app.use(express.static("public"));

// Custom middleware: a simple request logger, applied to ALL routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next(); // MUST call next() or the request hangs forever
});

let users = [{ id: 1, name: "David" }];
let nextId = 2;

// Route param: :id becomes req.params.id
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Query string: /users?name=David becomes req.query.name
app.get("/users", (req, res) => {
  const { name } = req.query;
  const filtered = name ? users.filter((u) => u.name.includes(name)) : users;
  res.json(filtered);
});

app.post("/users", (req, res) => {
  const { name } = req.body; // works because of express.json() middleware above
  if (!name) return res.status(400).json({ error: "name is required" });
  const newUser = { id: nextId++, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route-specific middleware example: only applies to this one route
function requireAdmin(req, res, next) {
  if (req.headers["x-role"] !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }
  next();
}
app.delete("/users/:id", requireAdmin, (req, res) => {
  users = users.filter((u) => u.id !== Number(req.params.id));
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Express server running at http://localhost:${PORT}`));
