# 13 - Microservices Basics

## Concepts covered
- Splitting one app into independently-deployable services
- Service-to-service HTTP communication
- A simple message queue pattern (in-memory, for the concept - real systems use RabbitMQ/SQS)
- Why microservices trade simplicity for scalability/independent deployment

## Files
- `user-service.js` — owns user data, port 4001
- `order-service.js` — owns orders, CALLS user-service to validate users, port 4002
- `package.json`

## Run it
```bash
npm install
node user-service.js     # in one terminal
node order-service.js    # in another terminal
curl -X POST http://localhost:4002/orders -H "Content-Type: application/json" -d '{"userId":1,"item":"Book"}'
```
