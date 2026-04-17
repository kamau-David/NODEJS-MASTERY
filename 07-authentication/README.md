# 07 - Authentication

## Concepts covered
- Password hashing with bcrypt (NEVER store plain-text passwords)
- Issuing JWTs (JSON Web Tokens) on login
- Protecting routes with middleware that verifies the token
- The difference between authentication (who are you) and authorization (what can you do)

## Files
- `server.js`
- `package.json`

## Run it
```bash
npm install
node server.js
```

## Try it
```bash
curl -X POST http://localhost:3003/register -H "Content-Type: application/json" -d '{"username":"david","password":"secret123"}'
curl -X POST http://localhost:3003/login -H "Content-Type: application/json" -d '{"username":"david","password":"secret123"}'
# copy the token from the login response, then:
curl http://localhost:3003/profile -H "Authorization: Bearer <token>"
```
