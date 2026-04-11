const path = require("path");

// __dirname / __filename are CommonJS-only globals giving absolute paths
console.log("__dirname:", __dirname);
console.log("__filename:", __filename);

// path.join is CRITICAL for cross-platform code - never hardcode '/' or '\\'
const filePath = path.join(__dirname, "data", "users.json");
console.log("Joined path:", filePath);

console.log("Extension:", path.extname(filePath));   // .json
console.log("Basename:", path.basename(filePath));    // users.json
console.log("Dirname:", path.dirname(filePath));      // .../data
console.log("Is absolute:", path.isAbsolute(filePath)); // true

// path.resolve builds an absolute path from right to left until one is absolute
console.log("Resolved:", path.resolve("data", "users.json"));
