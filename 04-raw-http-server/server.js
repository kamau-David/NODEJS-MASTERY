const http = require("http");
const url = require("url");

// In-memory "database" - resets every restart. Real persistence comes in 06.
let users = [{ id: 1, name: "David" }];
let nextId = 2;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;
  const { method } = req;

  // Manual routing: every framework you'll ever use is doing THIS under the hood,
  // just with nicer syntax. Feeling the tedium here is the point.
  if (method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Raw Node.js HTTP server - no frameworks");
    return;
  }

  if (method === "GET" && pathname === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
    return;
  }

  if (method === "POST" && pathname === "/users") {
    // Request bodies arrive as a STREAM of chunks - you must collect them
    // manually. This is exactly what body-parser/Express does for you.
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const newUser = { id: nextId++, name: data.name };
        users.push(newUser);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      }
    });
    return;
  }

  // Fallback 404 - without this, unmatched routes hang forever
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Raw HTTP server running at http://localhost:${PORT}`);
});
