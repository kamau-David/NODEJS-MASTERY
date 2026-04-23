const http = require("http");
const path = require("path");
const { Worker } = require("worker_threads");

function runWorker(n) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "math-worker.js"), {
      workerData: { n },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/heavy") {
    console.log("Offloading heavy calc to a worker thread...");
    const result = await runWorker(5_000_000_00); // main thread stays FREE while this runs
    res.end(`Result: ${result}`);
    return;
  }
  res.end("Try /heavy in one tab, then / in another - / responds instantly this time.");
});

server.listen(3007, () => {
  console.log("Server on :3007 - / now stays responsive even while /heavy runs.");
});
