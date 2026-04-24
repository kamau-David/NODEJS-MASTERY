const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} running, forking ${numCPUs} workers...`);

  // Fork one worker process PER CPU CORE - each gets its own event loop,
  // and the OS load-balances incoming connections across them.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, forking a replacement...`);
    cluster.fork(); // resilience: auto-restart crashed workers
  });
} else {
  // This code runs in EACH worker process
  http
    .createServer((req, res) => {
      res.end(`Handled by worker PID ${process.pid}\n`);
    })
    .listen(3008);

  console.log(`Worker ${process.pid} started`);
}
// Refresh http://localhost:3008 repeatedly - notice the PID changes,
// proving requests are load-balanced across multiple processes/cores.
