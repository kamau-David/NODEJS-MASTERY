# 03 - Async Programming

## Concepts covered
- Why JS/Node is single-threaded but non-blocking
- Callbacks and "callback hell"
- Promises (creation, chaining, `Promise.all`/`allSettled`/`race`)
- `async`/`await` (syntax sugar over Promises)
- The event loop phases (conceptual, tied to real code)

## Files
- `01-callback-hell.js` — the problem
- `02-promises.js` — the fix, part 1
- `03-async-await.js` — the fix, part 2 (cleanest syntax)
- `04-promise-combinators.js` — running async work in parallel
- `05-event-loop-order.js` — proves the execution order of micro/macrotasks

## Run it
```bash
node 01-callback-hell.js
node 02-promises.js
node 03-async-await.js
node 04-promise-combinators.js
node 05-event-loop-order.js
```
