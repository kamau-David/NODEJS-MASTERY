const { add, divide } = require("./calculator");

// describe groups related tests; it/test defines one individual test case
describe("calculator", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5); // ARRANGE (inputs) -> ACT (call) -> ASSERT (expect)
  });

  it("divides two numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  it("throws when dividing by zero", () => {
    // Testing that an error IS thrown - wrap the call in a function
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });
});
