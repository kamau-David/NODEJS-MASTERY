// Same logic again, with async/await - reads almost like synchronous code.
function getUser(id) {
  return new Promise((resolve) => setTimeout(() => resolve({ id, name: "David" }), 300));
}
function getOrders(userId) {
  return new Promise((resolve) => setTimeout(() => resolve(["order1", "order2"]), 300));
}
function getOrderDetails(orderId) {
  return new Promise((resolve) => setTimeout(() => resolve({ orderId, total: 42 }), 300));
}

async function run() {
  try {
    console.log("Starting async/await demo...");
    const user = await getUser(1);
    console.log("Got user:", user.name);

    const orders = await getOrders(user.id);
    console.log("Got orders:", orders);

    const details = await getOrderDetails(orders[0]);
    console.log("Got details:", details);
  } catch (err) {
    // try/catch works normally here - no special promise error handling needed
    console.error("Error:", err);
  }
}

run();
