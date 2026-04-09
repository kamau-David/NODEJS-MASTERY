// Different ways to write functions in JS, and when each is idiomatic.

// 1. Function declaration - hoisted, can be called before it's defined
function add(a, b) {
  return a + b;
}

// 2. Function expression - NOT hoisted, assigned to a variable
const subtract = function (a, b) {
  return a - b;
};

// 3. Arrow function - shorter syntax, does NOT bind its own `this`
const multiply = (a, b) => a * b;

// 4. Default parameters - avoids the old `b = b || 1` trick (which breaks on 0)
function power(base, exponent = 2) {
  return Math.pow(base, exponent);
}

// WHY arrow functions matter for `this`:
const counter = {
  count: 0,
  // Regular function: `this` refers to whatever calls it (unreliable in callbacks)
  incrementBad: function () {
    setTimeout(function () {
      this.count++; // `this` is undefined/global here, NOT `counter` - bug!
    }, 10);
  },
  // Arrow function: `this` is inherited from where incrementGood was DEFINED (counter)
  incrementGood: function () {
    setTimeout(() => {
      this.count++; // `this` correctly refers to `counter`
    }, 10);
  },
};

console.log("add(2,3) =", add(2, 3));
console.log("subtract(5,2) =", subtract(5, 2));
console.log("multiply(4,3) =", multiply(4, 3));
console.log("power(2) =", power(2), " power(2,3) =", power(2, 3));

counter.incrementGood();
setTimeout(() => console.log("counter.count after incrementGood:", counter.count), 20);
