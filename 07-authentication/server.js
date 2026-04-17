const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-in-production";
let users = []; // { username, passwordHash }

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ error: "username taken" });
  }
  // NEVER store the raw password. bcrypt hashes it with a built-in salt,
  // so even if your database leaks, passwords aren't directly readable.
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });
  res.status(201).json({ message: "registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "invalid credentials" });

  // The JWT is a signed, tamper-proof token containing user info.
  // The client stores it and sends it back on future requests instead of
  // re-sending the password every time.
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// AUTH MIDDLEWARE: verifies the token before letting the request through
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "no token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach decoded user info for downstream handlers
    next();
  } catch (err) {
    res.status(403).json({ error: "invalid or expired token" });
  }
}

app.get("/profile", requireAuth, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, this route is protected` });
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Auth server running at http://localhost:${PORT}`));
