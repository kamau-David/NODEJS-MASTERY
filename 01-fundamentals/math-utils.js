// CommonJS module - the "classic" Node.js module system.
// Everything in this file is private unless explicitly exported.

function square(n) {
  return n * n;
}

function cube(n) {
  return n * n * n;
}

const PI = 3.14159;

// module.exports defines exactly what other files can access via require()
module.exports = { square, cube, PI };
