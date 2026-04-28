// A classic real-world memory leak: an array that keeps growing because
// something keeps referencing old data and it's never released.

const leaks = [];

function simulateLeak() {
  const bigData = new Array(1_000_000).fill("leaked data");
  leaks.push(bigData); // NEVER removed - this array only grows, forever
}

let count = 0;
const interval = setInterval(() => {
  simulateLeak();
  count++;
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Iteration ${count}: heap used = ${used.toFixed(1)} MB (growing = leak)`);

  if (count >= 10) {
    clearInterval(interval);
    console.log("\nFIX: don't hold references you don't need - e.g. use a");
    console.log("bounded cache (LRU), clear arrays/listeners when done, and");
    console.log("watch out for closures capturing large objects unintentionally.");
  }
}, 200);
