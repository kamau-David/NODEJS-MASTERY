const http = require("http");

// A deliberately expensive synchronous calculation - simulates something
// like heavy image processing, complex math, or parsing a huge file.
function expensiveCalculation(n) {
  let result = 0;
  for (let i = 0; i < n; i++) result += Math.sqrt(i);
  return result;
}

const server = http.createServer((req, res) => {
  if (req.url === "/heavy") {
    console.log("Starting heavy calculation - server will FREEZE for ~2s...");
    const result = expensiveCalculation(5_000_000_00); // blocks the event loop
    res.end(`Result: ${result}`);
    return;
  }
  res.end("Try /heavy in one tab, then immediately hit / in another - it'll hang.");
});

server.listen(3006, () => {
  console.log("Server on :3006 - hit /heavy, then quickly hit / in another tab.");
  console.log("You'll see / doesn't respond until /heavy finishes - ONE thread, blocked.");
});
