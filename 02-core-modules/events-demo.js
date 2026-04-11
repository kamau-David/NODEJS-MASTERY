// EventEmitter is the pattern underneath HTTP servers, streams, and most
// async Node APIs. Understanding this unlocks how the rest of Node works.
const EventEmitter = require("events");

class OrderSystem extends EventEmitter {
  placeOrder(item) {
    console.log(`Order placed: ${item}`);
    // Emitting an event doesn't return anything to the caller -
    // it just notifies whoever is listening, decoupling the two.
    this.emit("orderPlaced", { item, timestamp: Date.now() });
  }
}

const orders = new OrderSystem();

// Multiple independent listeners can react to the same event
orders.on("orderPlaced", (order) => {
  console.log(`[Inventory] Reducing stock for ${order.item}`);
});

orders.on("orderPlaced", (order) => {
  console.log(`[Email] Sending confirmation for ${order.item}`);
});

// once() fires only on the first occurrence
orders.once("orderPlaced", () => {
  console.log("[Analytics] First order of the session logged");
});

orders.placeOrder("Node.js T-Shirt");
orders.placeOrder("JavaScript Mug"); // analytics listener won't fire again
