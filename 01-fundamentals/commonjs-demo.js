// require() pulls in the exported object from another file.
const { square, cube, PI } = require("./math-utils");

console.log("square(4) =", square(4));
console.log("cube(3) =", cube(3));
console.log("PI =", PI);

// Node caches modules - requiring the same file twice returns the SAME object,
// it does not re-run the file. This matters for stateful modules (e.g. DB connections).
const mathAgain = require("./math-utils");
console.log("Same cached module instance:", mathAgain === require("./math-utils"));
