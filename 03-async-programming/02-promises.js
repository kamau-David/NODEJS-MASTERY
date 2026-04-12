// The same three async steps, rewritten with Promises - flat instead of nested.

function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "David" }), 300);
  });
}
function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["order1", "order2"]), 300);
  });
}
function getOrderDetails(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ orderId, total: 42 }), 300);
  });
}

console.log("Starting promise chain demo...");
getUser(1)
  .then((user) => {
    console.log("Got user:", user.name);
    return getOrders(user.id); // returning a promise chains it - stays flat
  })
  .then((orders) => {
    console.log("Got orders:", orders);
    return getOrderDetails(orders[0]);
  })
  .then((details) => {
    console.log("Got details:", details);
  })
  .catch((err) => {
    // ONE catch handles errors from ANY step above - huge improvement
    console.error("Error at any step:", err);
  });
