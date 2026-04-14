# 04 - Raw HTTP Server

## Concepts covered
- Building a server with zero dependencies using the built-in `http` module
- Manual routing (method + URL matching)
- Reading request bodies, setting headers, status codes
- Why frameworks like Express exist (you'll feel the pain here first)

## Files
- `server.js` — a working server with 4 routes and manual routing/body parsing

## Run it
```bash
node server.js
# then in another terminal:
curl http://localhost:3000/
curl http://localhost:3000/users
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"David"}'
```
