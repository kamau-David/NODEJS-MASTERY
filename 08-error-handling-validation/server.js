const express = require("express");
const { z } = require("zod");
const AppError = require("./AppError");

const app = express();
app.use(express.json());

// Validation SCHEMA - declares exactly what valid input looks like.
// Compare this to manually writing `if (!name) ... if (typeof age !== 'number') ...`
// for every field - schemas scale much better.
const createUserSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  age: z.number().int().positive().optional(),
});

// asyncHandler wraps async route handlers so thrown errors/rejected promises
// automatically reach the error middleware, instead of crashing the process
// or hanging silently (a very common real-world Express bug).
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

app.post("/users", asyncHandler(async (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    // .flatten() gives a clean, field-by-field error report
    throw new AppError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  res.status(201).json({ message: "User created", data: result.data });
}));

app.get("/crash-test", asyncHandler(async (req, res) => {
  // Simulates an unexpected bug (not user error) - e.g. a typo'd variable
  throw new Error("Something broke internally");
}));

app.get("/not-found-test", asyncHandler(async (req, res) => {
  throw new AppError("Resource not found", 404);
}));

// CENTRALIZED ERROR MIDDLEWARE - must have exactly 4 params for Express
// to recognize it as an error handler, and it must be registered LAST.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  if (!isOperational) {
    // Unexpected bug: log the full stack for debugging, but never expose
    // internals to the client.
    console.error("UNEXPECTED ERROR:", err.stack);
  }

  res.status(statusCode).json({
    error: isOperational ? err.message : "Something went wrong on our end",
  });
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Error-handling demo running at http://localhost:${PORT}`));
