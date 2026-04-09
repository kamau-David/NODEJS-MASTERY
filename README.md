# Node.js Mastery: Beginner to Pro

A project-based curriculum covering Node.js from first principles to production-grade patterns.
Each numbered folder is a standalone mini-project. Work through them in order — each builds on
concepts from the last.

## How to use this repo
1. `cd` into a folder
2. Read that folder's `README.md` first — it explains the concept before you touch code
3. Run `npm install` (if a package.json exists) then follow the run instructions
4. Read the code comments — they explain *why*, not just *what*

## Curriculum

| # | Folder | Concepts |
|---|--------|----------|
| 01 | fundamentals | variables, functions, modules (CommonJS & ESM), npm basics |
| 02 | core-modules | fs, path, os, events, process |
| 03 | async-programming | callbacks, callback hell, Promises, async/await, event loop |
| 04 | raw-http-server | the `http` module, manual routing, request/response lifecycle |
| 05 | express-basics | routes, middleware, static files, request parsing |
| 06 | rest-api-database | full CRUD API with a real database (SQLite, zero external setup) |
| 07 | authentication | password hashing, JWT, protected routes |
| 08 | error-handling-validation | centralized error handling, input validation, custom errors |
| 09 | streams-buffers | readable/writable streams, piping, buffers, backpressure |
| 10 | realtime-websockets | Socket.io basics, real-time chat |
| 11 | testing | unit + integration tests with Jest/Supertest |
| 12 | workers-clustering | worker_threads, cluster module, CPU-bound work |
| 13 | microservices | service-to-service communication, message queue pattern |
| 14 | docker-deployment | Dockerfile, docker-compose, env config, production readiness |
| 15 | advanced-patterns | event loop deep dive, memory leaks, performance profiling |

## Prerequisites
- Node.js 18+ installed (`node --version` to check)
- Basic JavaScript (variables, functions, arrays/objects)

Start here: [`01-fundamentals`](./01-fundamentals)
