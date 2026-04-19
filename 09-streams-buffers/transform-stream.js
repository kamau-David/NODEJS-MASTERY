const { Transform } = require("stream");

// A Transform stream reads data in, changes it, and passes it along -
// like a pipe filter. Here: uppercase everything that flows through.
class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback(); // signals "I'm done with this chunk, send me the next one"
  }
}

const upper = new UppercaseTransform();

process.stdin.pipe(upper).pipe(process.stdout);

console.log("Type something and press Enter (it'll be uppercased). Ctrl+C to exit.");
