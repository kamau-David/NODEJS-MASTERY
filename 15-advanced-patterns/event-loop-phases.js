// The event loop has distinct PHASES, each with its own queue. This demo
// shows callbacks landing in different phases, proving the order isn't random.

const fs = require("fs");

console.log("start");

// TIMERS phase
setTimeout(() => console.log("timeout"), 0);

// CHECK phase (runs right after I/O callbacks, before timers loop again)
setImmediate(() => console.log("immediate"));

// I/O callback - lands in the poll phase
fs.readFile(__filename, () => {
  console.log("file read callback (poll phase)");
  // Inside an I/O callback, setImmediate ALWAYS fires before setTimeout,
  // because the check phase comes right after poll in the loop's order.
  setTimeout(() => console.log("timeout inside I/O"), 0);
  setImmediate(() => console.log("immediate inside I/O (always first here)"));
});

console.log("end");
