const express = require("express");
const app = express();
app.use(express.json());

const orders = [];
let nextId = 1;
const USER_SERVICE_URL = "http://localhost:4001";

app.post("/orders", async (req, res) => {
  const { userId, item } = req.body;

  // Instead of having its own copy of user data, order-service calls
  // user-service over HTTP to verify the user exists. This keeps user data
  // in ONE place, at the cost of a network call (and a dependency: if
  // user-service is down, this endpoint breaks too - a real tradeoff).
  try {
    const userRes = await fetch(`${USER_SERVICE_URL}/users/${userId}`);
    if (!userRes.ok) {
      return res.status(400).json({ error: "invalid userId" });
    }
    const user = await userRes.json();

    const order = { id: nextId++, userId, userName: user.name, item };
    orders.push(order);
    res.status(201).json(order);
  } catch (err) {
    // If user-service is unreachable, fail clearly rather than silently
    res.status(503).json({ error: "user-service unavailable" });
  }
});

app.get("/orders", (req, res) => res.json(orders));

app.listen(4002, () => console.log("order-service running on :4002"));
