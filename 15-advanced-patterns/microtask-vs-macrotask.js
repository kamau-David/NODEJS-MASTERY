// process.nextTick has EVEN HIGHER priority than Promise microtasks -
// it runs before the microtask queue is processed, after each phase.

console.log("1: sync");

setTimeout(() => console.log("5: setTimeout"), 0);
setImmediate(() => console.log("6: setImmediate"));

process.nextTick(() => console.log("3: nextTick (highest priority)"));
Promise.resolve().then(() => console.log("4: Promise.then"));

console.log("2: sync");

// Order: 1, 2 (sync) -> 3 (nextTick, drained FIRST) -> 4 (microtasks) ->
// 5/6 (macrotasks - order between these two can vary depending on context)
//
// PRACTICAL RULE: prefer async/await and Promises for your own code.
// process.nextTick is mostly used internally by Node core/libraries -
// overusing it can starve I/O since it's checked so aggressively.
