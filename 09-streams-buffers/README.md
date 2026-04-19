# 09 - Streams & Buffers

## Concepts covered
- Buffers: raw binary data in Node.js
- Readable and Writable streams
- Piping (connecting streams together, the Unix-pipe philosophy)
- Backpressure: why streams matter for large files (constant memory, not loading whole file into RAM)

## Files
- `buffer-demo.js`
- `stream-copy.js` — copies a large-ish file using streams (constant memory use)
- `transform-stream.js` — a custom stream that transforms data as it flows through

## Run it
```bash
node buffer-demo.js
node stream-copy.js
node transform-stream.js
```
