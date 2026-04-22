const express = require("express");
const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.post("/echo", (req, res) => {
  if (!req.body.message) return res.status(400).json({ error: "message required" });
  res.json({ echoed: req.body.message });
});

module.exports = app; // exported WITHOUT calling .listen() so tests can import it directly
