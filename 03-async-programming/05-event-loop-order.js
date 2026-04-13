// Proves the execution order beginners always get wrong. Run this and predict
// the output BEFORE reading the comments below.

console.log("1: synchronous start");

setTimeout(() => console.log("5: setTimeout (macrotask)"), 0);

Promise.resolve().then(() => console.log("3: Promise.then (microtask)"));

queueMicrotask(() => console.log("4: queueMicrotask (microtask)"));

console.log("2: synchronous end");

// WHY this order (1,2,3,4,5):
// - Synchronous code ALWAYS runs first, top to bottom, no exceptions.
// - After the synchronous code finishes, Node drains the ENTIRE microtask
//   queue (Promises, queueMicrotask) before touching the next macrotask.
// - Only THEN does it move to macrotasks (setTimeout, setInterval, I/O callbacks).
// - This is why setTimeout(fn, 0) does NOT mean "run immediately" -
//   it means "run after all current sync code AND all microtasks are done."
