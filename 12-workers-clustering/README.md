# 12 - Worker Threads & Clustering

Node.js is single-threaded for your JS code by default - this folder covers
the two main ways to actually use multiple CPU cores.

## Concepts covered
- `worker_threads`: offloading CPU-heavy work so it doesn't block the event loop
- `cluster`: running multiple copies of your server to use all CPU cores
- When to use which

## Files
- `blocking-problem.js` — proves how one heavy task freezes an entire server
- `worker-solution.js` — fixes it using worker_threads
- `math-worker.js` — the worker script itself
- `cluster-server.js` — a clustered HTTP server using all CPU cores

## Run it
```bash
node blocking-problem.js     # notice the server is unresponsive during the heavy calc
node worker-solution.js      # server stays responsive - heavy calc runs on another thread
node cluster-server.js       # check how many workers spawn (matches your CPU core count)
```
