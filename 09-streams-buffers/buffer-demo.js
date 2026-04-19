// A Buffer is Node's way of handling raw binary data (before it's decoded
// into a string, image, etc). Every file read, network packet, etc. arrives
// as buffers under the hood.

const buf = Buffer.from("Hello Node.js", "utf-8");
console.log("Buffer:", buf);                 // raw bytes, e.g. <Buffer 48 65 6c ...>
console.log("As string:", buf.toString());   // decoded back to text
console.log("Byte length:", buf.length);
console.log("First byte (H = 72):", buf[0]);

// Buffers are fixed-size and mutable - useful for binary protocols
const fixedBuf = Buffer.alloc(4);
fixedBuf.writeInt32BE(42, 0);
console.log("Manually written int32:", fixedBuf.readInt32BE(0));
