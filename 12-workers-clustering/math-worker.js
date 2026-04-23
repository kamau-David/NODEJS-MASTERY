const { parentPort, workerData } = require("worker_threads");

function expensiveCalculation(n) {
  let result = 0;
  for (let i = 0; i < n; i++) result += Math.sqrt(i);
  return result;
}

// This file runs in a SEPARATE thread - it has its own event loop and
// memory space, communicating with the main thread only via messages.
const result = expensiveCalculation(workerData.n);
parentPort.postMessage(result);
