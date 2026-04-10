// ESM (ECMAScript Modules) - the modern standard JS module system.
// Note the .mjs extension (or "type": "module" in package.json) is required.

// Named export/import example, defined inline here for simplicity:
export function greet(name) {
  return `Hello, ${name}!`;
}

// Top-level await works in ESM (not in CommonJS without wrapping)
async function main() {
  console.log(greet("David"));
  const data = await Promise.resolve("fetched instantly");
  console.log("Top-level await works:", data);
}

main();
