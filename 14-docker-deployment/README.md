# 14 - Docker & Deployment Readiness

## Concepts covered
- Writing a production-ready Dockerfile for a Node app
- `.dockerignore`
- Environment-based config (never hardcode secrets/URLs)
- Health checks and graceful shutdown
- docker-compose for running app + database together

## Files
- `server.js` — production-minded Express app
- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml`
- `.env.example`
- `package.json`

## Run it
```bash
docker build -t my-node-app .
docker run -p 3000:3000 --env-file .env my-node-app
# or, with a database attached:
docker compose up
```
