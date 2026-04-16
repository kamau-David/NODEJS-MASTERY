# 06 - REST API with a Real Database

Uses SQLite (via `better-sqlite3`) so there's zero external setup - the whole
database is a single file. Same concepts transfer directly to Postgres/MySQL/Supabase.

## Concepts covered
- Full CRUD (Create, Read, Update, Delete)
- Parameterized queries (SQL injection prevention)
- Connecting a real persistence layer to Express routes
- Separating concerns: routes vs database logic

## Files
- `db.js` — database setup and query functions
- `server.js` — Express routes calling into db.js
- `package.json`

## Run it
```bash
npm install
node server.js
```
