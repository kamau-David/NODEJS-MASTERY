const fs = require("fs");
const path = require("path");

const sourceFile = path.join(__dirname, "source.txt");
const destFile = path.join(__dirname, "destination.txt");

// Create a moderately sized test file first
fs.writeFileSync(sourceFile, "Line of text.\n".repeat(100000)); // ~1.4MB

console.log("Copying with streams (constant memory, regardless of file size)...");

const readStream = fs.createReadStream(sourceFile);
const writeStream = fs.createWriteStream(destFile);

// WHY this matters: fs.readFileSync() loads the ENTIRE file into memory at
// once. For a 2GB video file, that's 2GB of RAM just to copy it. Streams
// process the file in small CHUNKS (default 64KB), so memory usage stays
// flat no matter how large the file is.
readStream.pipe(writeStream);

writeStream.on("finish", () => {
  const stats = fs.statSync(destFile);
  console.log(`Copy complete. File size: ${(stats.size / 1024).toFixed(0)} KB`);
  fs.unlinkSync(sourceFile);
  fs.unlinkSync(destFile);
});

readStream.on("error", (err) => console.error("Read error:", err));
writeStream.on("error", (err) => console.error("Write error:", err));
