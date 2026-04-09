// SCOPE: the #1 thing that confuses beginners coming from other languages.

// var is function-scoped and hoisted (leaks out of blocks) - avoid it.
function varProblem() {
  if (true) {
    var x = 10;
  }
  console.log("var leaks out of the if-block:", x); // 10 - surprising!
}
varProblem();

// let/const are block-scoped - this is what you should use.
function letFix() {
  if (true) {
    let y = 10;
  }
  try {
    console.log(y);
  } catch (e) {
    console.log("let is properly scoped, throws:", e.message);
  }
}
letFix();

// Classic closure-in-a-loop bug, and why let fixes it
console.log("\n--- Closure in loop bug ---");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var loop:", i), 0); // prints 3, 3, 3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let loop:", j), 0); // prints 0, 1, 2
}
// WHY: var is shared across all iterations (one variable), let creates
// a NEW binding per iteration (three variables). This is a real interview question.
