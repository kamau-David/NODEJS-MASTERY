// Simulates fetching a user, then their orders, then order details -
// each step depending on the last. This nesting pattern is "callback hell."

function getUser(id, callback) {
  setTimeout(() => callback(null, { id, name: "David" }), 300);
}
function getOrders(userId, callback) {
  setTimeout(() => callback(null, ["order1", "order2"]), 300);
}
function getOrderDetails(orderId, callback) {
  setTimeout(() => callback(null, { orderId, total: 42 }), 300);
}

console.log("Starting callback hell demo...");
getUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log("Got user:", user.name);
  getOrders(user.id, (err, orders) => {
    if (err) return console.error(err);
    console.log("Got orders:", orders);
    getOrderDetails(orders[0], (err, details) => {
      if (err) return console.error(err);
      console.log("Got details:", details);
      // Imagine 3 more nested levels - error handling repeats every level,
      // code drifts right, and it's hard to reason about the actual flow.
      console.log("--- This nesting is exactly what Promises solve ---");
    });
  });
});
