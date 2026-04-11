const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "sample.txt");

// 1. SYNC - blocks the entire event loop until done. Fine for scripts/CLI tools,
// BAD in a server handling multiple requests (freezes everyone else).
fs.writeFileSync(filePath, "Hello from sync write\n");
const syncContent = fs.readFileSync(filePath, "utf-8");
console.log("Sync read:", syncContent.trim());

// 2. CALLBACK-based ASYNC - the original Node.js pattern. Non-blocking,
// but leads to "callback hell" when nested (see 03-async-programming).
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) return console.error("Callback read error:", err);
  console.log("Callback read:", data.trim());
});

// 3. PROMISE-based ASYNC - modern, cleanest with async/await.
async function promiseDemo() {
  const data = await fsPromises.readFile(filePath, "utf-8");
  console.log("Promise read:", data.trim());

  await fsPromises.appendFile(filePath, "Appended line\n");
  const updated = await fsPromises.readFile(filePath, "utf-8");
  console.log("After append:\n" + updated);

  await fsPromises.unlink(filePath); // cleanup
  console.log("File cleaned up.");
}
promiseDemo().catch(console.error);
