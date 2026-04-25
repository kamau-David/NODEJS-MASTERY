const express = require("express");
const app = express();
app.use(express.json());

// This service OWNS user data - no other service touches this data directly,
// they must ask THIS service via HTTP. This is the core microservices idea:
// each service is the single source of truth for its own domain.
const users = [{ id: 1, name: "David" }, { id: 2, name: "Grace" }];

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "not found" });
  res.json(user);
});

app.listen(4001, () => console.log("user-service running on :4001"));
