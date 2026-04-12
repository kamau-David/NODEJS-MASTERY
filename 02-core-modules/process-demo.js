// process gives you info about, and control over, the current Node.js process.

console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("Command-line args:", process.argv.slice(2)); // try: node process-demo.js hello world

// Environment variables - how you keep secrets/config OUT of your code
console.log("NODE_ENV:", process.env.NODE_ENV || "not set (defaults to development in most tools)");

// Graceful shutdown pattern - important for real servers (see 14-docker-deployment)
process.on("SIGINT", () => {
  console.log("\nReceived SIGINT (Ctrl+C) - cleaning up before exit...");
  process.exit(0);
});

console.log("Process running with PID:", process.pid, "- press Ctrl+C to test graceful shutdown, or wait 2s");
setTimeout(() => console.log("(demo timeout finished, exiting normally)"), 2000);
