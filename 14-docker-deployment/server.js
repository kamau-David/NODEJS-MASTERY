const express = require("express");
const app = express();

// Config from environment variables, NEVER hardcoded - this is what makes
// the same Docker image work in dev, staging, and production unchanged.
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.get("/", (req, res) => res.json({ message: `Running in ${NODE_ENV}` }));

// Health check endpoint - Docker/Kubernetes/load balancers poll this to know
// if your app is alive and ready to receive traffic.
app.get("/health", (req, res) => res.status(200).json({ status: "healthy" }));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});

// GRACEFUL SHUTDOWN: when Docker/Kubernetes stops a container, it sends
// SIGTERM and waits a bit before force-killing. Without this, in-flight
// requests get dropped abruptly.
process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing server gracefully...");
  server.close(() => {
    console.log("Server closed. Exiting.");
    process.exit(0);
  });
});
