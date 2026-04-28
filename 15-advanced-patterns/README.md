# 15 - Advanced Patterns

## Concepts covered
- The event loop's actual phases (timers, I/O, check, close callbacks)
- Memory leaks: a real example and how to spot one
- `process.nextTick` vs `setImmediate` vs `setTimeout(fn, 0)`
- Basic performance profiling

## Files
- `event-loop-phases.js`
- `memory-leak-demo.js`
- `microtask-vs-macrotask.js`

## Run it
```bash
node event-loop-phases.js
node --expose-gc memory-leak-demo.js
node microtask-vs-macrotask.js
```
